"use client";

import React, { useState, useEffect } from "react";

type Wallet = {
  address: string;
  publicKey: string;
  privateKey: string;
};

const generateWallet = (): Wallet => {
  return {
    address: `0x${Math.random().toString(36).substr(2, 9)}`,
    publicKey: `pub-${Math.random().toString(36).substr(2, 9)}`,
    privateKey: `priv-${Math.random().toString(36).substr(2, 9)}`,
  };
};

const Burners: React.FC = () => {
  const [wallets, setWallets] = useState<Wallet[]>([]);

  useEffect(() => {
    const loadedWallets = localStorage.getItem("wallets");
    if (loadedWallets) {
      setWallets(JSON.parse(loadedWallets));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wallets", JSON.stringify(wallets));
  }, [wallets]);

  const handleCreate = () => {
    if (wallets.length < 5) {
      const newWallet = generateWallet();
      setWallets([...wallets, newWallet]);
    } else {
      alert("Maximum of 5 burner accounts are allowed.");
    }
  };

  const clearWallets = () => {
    setWallets([]);
    localStorage.removeItem("wallets");
  };

  return (
    <div className="flex justify-center p-4">
      <div className="flex flex-col items-start gap-2">
        <h3 className="font-bold text-start">Burner Wallets:</h3>
        {wallets.map((wallet, index) => (
          <div key={index} className="flex flex-col gap-2 p-2 border-2">
            <h4>Burner {index + 1}</h4>
            <p>Private Key: {wallet.privateKey}</p>
            <p>Public Key: {wallet.publicKey}</p>
            <p>Account Address: {wallet.address}</p>
          </div>
        ))}
        <button
          className="mt-4 p-2 bg-blue-500 text-white rounded"
          onClick={handleCreate}
        >
          Generate Wallet
        </button>
        <button
          className="mt-2 p-2 bg-red-500 text-white rounded"
          onClick={clearWallets}
        >
          Clear Wallets
        </button>
      </div>
    </div>
  );
};

export default Burners;
