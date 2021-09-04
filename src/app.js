import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import Navbar from "./components/Navbar";
import Particles from "./components/Particles";

import web3 from "./web3";
import Main from "./components/MainLayout";

const App = () => {
  const [account, setAccount] = useState("");
  const [loading, setLoading] = useState(false);

  const [Tether, setTether] = useState(null);
  const [RWD, setRWD] = useState(null);
  const [DecentralBank, setDecentralBank] = useState(null);

  const [stakingBalance, setStakingBalance] = useState("");
  const [tetherBalance, setTetherBalance] = useState("");
  const [rwdBalance, setRwdBalance] = useState("");

  const [tetherContract, setTetherContract] = useState({});
  const [rwdContract, setRwdContract] = useState({});
  // console.log("rwddddddddddddddddddddddd", rwdContract);
  const [decentralBankContract, setDecentralBankContract] = useState({});

  const [error, setError] = useState("");

  const loadBlockchainData = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } catch (error) {
        if (error.code === 4001) {
          // User rejected request
        }

        setError(error);
      }
    }
    let networkId;

    try {
      networkId = await web3.eth.net.getId();
    } catch (e) {
      console.log(e);
    }

    //              CREATE TETHER CONTRACT

    try {
      const tetherData = Tether.networks[networkId];
      // console.log("tetherdAtaadfadsf", tetherData);

      if (tetherData) {
        const tether = new web3.eth.Contract(Tether.abi, tetherData.address);
        console.log("tetherereerer", tether);
        setTetherContract(tether);

        let tetherBalance = await tetherContract.methods
          .balanceOf(account)
          .call();
        setTetherBalance(tetherBalance.toString());
      }
    } catch (e) {
      console.log(e);
      setError("Error! Tether contract not deployed-no detected network");
    }

    //                 CREATE RWD CONTRACT
    try {
      const rwdData = RWD.networks[networkId];

      if (rwdData) {
        const Rwd = new web3.eth.Contract(RWD.abi, rwdData.address);
        setRwdContract(Rwd);
        let rewardBalance = await rwdContract.methods.balanceOf(account).call();
        setRwdBalance(rewardBalance.toString());
      }
    } catch (e) {
      console.log("IN CREATING rwd contract", e);
      setError("Error! Tether contract not deployed-no detected network");
    }

    //               CREATE DECENTRALBANK CONTRACT

    try {
      const decentralBankData = DecentralBank.networks[networkId];

      if (decentralBankData) {
        const decentralBank = new web3.eth.Contract(
          DecentralBank.abi,
          decentralBankData.address
        );
        setDecentralBankContract(decentralBank);
        let stakingBalanceInDecentralBank = await decentralBankContract.methods
          .stakingBalance(account)
          .call();
        setStakingBalance(stakingBalanceInDecentralBank.toString());
      }
    } catch (e) {
      console.log("error in decentral bank", e);
      setError("Error! Tether contract not deployed-no detected network");
    }

    setLoading(false);
  };
  // useEffect doesn't expect the callback function to return Promise,
  useEffect(() => {
    fetch("./contracts/Tether.json")
      .then((data) => data.json())
      .then((data) => setTether(data));
    fetch("./contracts/RWD.json")
      .then((data) => data.json())
      .then((data) => setRWD(data));
    fetch("./contracts/DecentralBank.json")
      .then((data) => data.json())
      .then((data) => setDecentralBank(data));
  }, []);

  useEffect(() => {
    loadBlockchainData();
  }, [Tether, RWD, DecentralBank]);
  console.log("tetherContract", typeof account);
  const stakeTokens = async (amount) => {
    setLoading(true);
    try {
      await tetherContract.methods
        .approve(decentralBankContract._address, amount)
        .send({ from: account })
        .on("transactionHash", (hash) => {
          decentralBankContract.methods
            .depositTokens(amount)
            .send({ from: account })
            .on("transactionHash", (hash) => {
              setLoading(false);
            });
        });
    } catch (e) {
      console.log("error in staking tokens", e);
    }
  };

  const unstakeTokens = async () => {
    setLoading(true);
    try {
      console.log("decentralBankOcntranc in unstakin", decentralBankContract);
      await decentralBankContract.methods
        .unstakeTokens()
        .send({ from: account })
        .on("transactionHash", (hash) => {
          setLoading(false);
        });
    } catch (e) {
      console.log("error in unstaking", e);
    }
  };

  return (
    <Container className="m-0">
      <Row>
        <Col style={{ position: "relative" }}>
          <div style={{ position: "absolute" }}>
            <Particles />
          </div>

          <Navbar account={account} />
          <div className="container-fluid mt-5">
            <div className="row">
              <main
                role="main"
                className="col-lg-12 ml-auto mr-auto"
                style={{ maxWidth: "600px" }}
                style={{ minHeight: "100vm" }}
              >
                <div>
                  <Main
                    tetherBalance={tetherBalance}
                    rwdBalance={rwdBalance}
                    stakingBalance={stakingBalance}
                    stakeTokens={stakeTokens}
                    unstakeTokens={unstakeTokens}
                    decentralBankContract={decentralBankContract}
                  />
                </div>
              </main>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
