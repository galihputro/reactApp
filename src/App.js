import { useState, useEffect, useRef } from "react";
import CurrencyFormat from "react-currency-format";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  console.log(App);
  const [saldo, setSaldo] = useState(0);

  useEffect(() => {
    if (window.performance) {
      if (performance.navigation.type === 1) {
        setSaldo(0);
      } else {
        setSaldo(JSON.parse(window.localStorage.getItem("saldo")));
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("saldo", saldo);
  }, [saldo]);

  const AuthPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [coba, setCoba] = useState(3);
    return (
      <div className="auth-page">
        <h1>Auth Page</h1>
        <form className="auth-form">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              if (username === "admin" && password === "test") {
                window.open("/index", "_self");
              } else if (coba === 1) {
                alert(
                  "Anda telah salah memasukkan username dan password sebanyak 3 kali \n Akun anda telah diblokir"
                );
                window.location.reload();
              } else {
                setCoba(coba - 1);
                let sisa = coba - 1;
                setError(
                  "Username atau password salah \n Sisa percobaan : " +
                    sisa +
                    " kali"
                );
              }
            }}
          >
            Login
          </button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    );
  };

  const CekSaldo = () => {
    return (
      <p>
        Saldo Anda:{" "}
        <CurrencyFormat
          value={saldo}
          thousandSeparator={"."}
          decimalSeparator={","}
          displayType={"text"}
          prefix={"Rp. "}
        />
      </p>
    );
  };

  const SetorTunai = () => {
    const nomRef = useRef(null);
    useEffect(() => {
      console.log(nomRef.current.state.numAsString);
    }, []);
    return (
      <>
        <h3>SetorTunai</h3>
        <p>
          Saldo Anda:{" "}
          <CurrencyFormat
            value={saldo}
            thousandSeparator={"."}
            decimalSeparator={","}
            displayType={"text"}
            prefix={"Rp. "}
          />
        </p>
        <CurrencyFormat
          thousandSeparator={"."}
          decimalSeparator={","}
          displayType={"input"}
          prefix={"Rp. "}
          type="text"
          ref={nomRef}
        />
        <button
          onClick={() =>
            setSaldo(
              parseInt(saldo) + parseInt(nomRef.current.state.numAsString)
            )
          }
        >
          Setor
        </button>
        <a href="/index">Kembali</a>
      </>
    );
  };

  const TarikTunai = () => {
    const nomRef = useRef(null);
    return (
      <>
        <h3>TarikTunai</h3>
        <p>
          Saldo Anda:{" "}
          <CurrencyFormat
            value={saldo}
            thousandSeparator={"."}
            decimalSeparator={","}
            displayType={"text"}
            prefix={"Rp. "}
          />
        </p>
        <CurrencyFormat
          thousandSeparator={"."}
          decimalSeparator={","}
          displayType={"input"}
          prefix={"Rp. "}
          type="text"
          ref={nomRef}
        />
        <button
          onClick={() =>
            setSaldo(
              parseInt(saldo) - parseInt(nomRef.current.state.numAsString)
            )
          }
        >
          Tarik Tunai
        </button>
        <a href="/index">Kembali</a>
      </>
    );
  };

  const IndexPage = () => {
    return (
      <>
        <div className="main-index">
          <ul>
            <li>
              <a href="/ceksaldo">Cek Saldo</a>
            </li>
            <li>
              <a href="/setortunai">Setor Tunai</a>
            </li>
            <li>
              <a href="/tariktunai">Tarik Tunai</a>
            </li>
          </ul>
        </div>
      </>
    );
  };
  let lf = window.location.pathname;
  return (
    <BrowserRouter>
      <div className="header">
        <h1>
          <a href={lf !== "/" ? "/index" : "/"}>ATM</a>
        </h1>
      </div>
      <button
        style={{ display: lf === "/index" ? "block" : "none" }}
        id="logoutbtn"
        onClick={() => {
          window.open("/", "_self");
        }}
      >
        Logout
      </button>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/index" element={<IndexPage />} />
        <Route path="/ceksaldo" element={<CekSaldo />} />
        <Route path="/setortunai" element={<SetorTunai />} />
        <Route path="/tariktunai" element={<TarikTunai />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
