import { Resource, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Resource[]> {
  return [
    {
      id: "0",
      name: "The Starknet Book",
      description:
        "The Starknet Book is a step-by-step guide aimed at teaching you the essentials of Starknet development. This book works hand-in-hand with the Cairo Book",
      status: "Up to date",
      url: "https://book.starknet.io/",
    },
    {
      id: "1",
      name: "The Cairo Programming Language",
      description:
        "The Cairo Book helps you master Cairo. Get ready to start your Cairo journey!",
      status: "Up to date",
      url: "https://book.cairo-lang.org/",
    },
    {
      id: "2",
      name: "Setting Up: Cairo with Node Guardians",
      description: "Embark on a build quest in Cairo!",
      status: "Up to date",
      url: "https://nodeguardians.io/dev-hub?s=devhub-campaigns&sc=starting-cairo",
    },
    {
      id: "3",
      name: "StarkNet ERC721 Tutorial",
      description:
        "Learn how to deploy and customize an ERC721 token on StarkNet ",
      status: "Out of date",
      url: "https://github.com/starknet-edu/starknet-erc721",
    },
    {
      id: "4",
      name: "Awesome Starknet",
      description:
        " A curated list of awesome StarkNet resources, libraries, tools and more.",
      status: "Up to date",
      url: "https://github.com/keep-starknet-strange/awesome-starknet",
    },
    {
      id: "5",
      name: "Cairo Lang",
      description:
        "Documentation for the Cairo Language. Cairo is the first Turing-complete language for creating provable programs for general computation.",
      status: "Up to date",
      url: "https://docs.cairo-lang.org/",
    },
    {
      id: "6",
      name: "blabla",
      description:
        "This resource does blablalba and shows you how to do blablablabla. This resource does blablalba and shows you how to do blablablabla. This resource does blablalba and shows you how to do blablablabla. This resource does blablalba and shows you how to do blablablabla.",
      status: "Up to date",
      url: "https://www.starknet-ecosystem.com/fr/academy",
    },
    {
      id: "7",
      name: "OpenZeppelin Cairo Contracts",
      description:
        "OpenZeppelin Contracts written in Cairo for Starknet, a decentralized ZK Rollup ",
      status: "Up to date",
      url: "https://github.com/OpenZeppelin/cairo-contracts",
    },
    {
      id: "8",
      name: "Cairo Goldmine",
      description:
        "A comprehensive, annotated list of repositories of the starknet ecosystem.",
      status: "Out of date",
      url: "https://github.com/beautyisourbusiness/cairo-goldmine",
    },
    {
      id: "9",
      name: "Warp",
      description:
        "Bringing Solidity to Starknet at warp speed. Warp is a Solidity to Cairo Compiler, this allows teams to write/migrate Solidity to Cairo for easy onboarding into the StarkNet ecosystem.",
      status: "Out of date",
      url: "https://github.com/NethermindEth/warp",
    },
    {
      id: "10",
      name: "Starknet Hardhat plugin",
      description:
        "A plugin for integrating Starknet tools into Hardhat projects.",
      status: "Up to date",
      url: "https://github.com/0xSpaceShard/starknet-hardhat-plugin",
    },
    {
      id: "11",
      name: "Starknet dApps and tools",
      description:
        "Unofficial ecosystem page for Ethereum and its layer 2s like Starknet.",
      status: "Up to date",
      url: "https://www.ethereum-ecosystem.com/blockchains/starknet",
    },
  ];
}

export default async function Page() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
