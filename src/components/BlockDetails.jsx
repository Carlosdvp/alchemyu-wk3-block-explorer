import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export const BlockDetails = () => {
  const [blockNumber, setBlockNumber] = useState();
  const [block, setBlock] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const latestBlockNumber = await alchemy.core.getBlockNumber();
        setBlockNumber(latestBlockNumber);
        
        const latestBlock = await alchemy.core.getBlock(latestBlockNumber)
        setBlock(latestBlock)
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    }

    fetchData()
  }, []);

  console.log(block)

  return (
    <>
      <h1 className='text-red-900 font-semibold text-3xl text-center py-12'>BlockDetails</h1>
      <p>Block Number: {blockNumber}</p>
      <p>Block hash: {block?.hash}</p>
    </>
  )
}
