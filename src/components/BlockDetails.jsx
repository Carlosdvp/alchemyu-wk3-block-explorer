import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

function displayTransactions(transactions, startIndex) {
  return transactions.slice(startIndex, startIndex + 10).map((transactionHash, index) => (
    <p key={index}>Transaction {startIndex + index + 1}: {transactionHash}</p>
  ))
}

export const BlockDetails = () => {
  const [blockNumber, setBlockNumber] = useState();
  const [block, setBlock] = useState();
  const [startIndex, setStartIndex] = useState(0);
  const [resetTxCount, setResetTxCount] = useState(false);

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

  const handleNextButtonClick = () => {
    setStartIndex(prevIndex => prevIndex + 10);
  };

  const handleResetButtonClick = () => {
    setStartIndex(0);
    setResetTxCount(true);
  }

  useEffect(() => {
    if (resetTxCount) {
      setStartIndex(0);
      setResetTxCount(false);
    }
  }, [resetTxCount])

  return (
    <div className='bg-slate-300 h-full'>
      <h1 className='text-red-900 font-semibold text-3xl text-center py-12'>
        Block Details
      </h1>
      <p
        className='font-semibold mb-8 px-6'>
        Block Number: {blockNumber}
      </p>
      <div
        className='px-6'>
        {displayTransactions(block?.transactions || [], startIndex)}
      </div>
      <div className='flex flex-row w-[50%] items-center pt-12 mx-auto my-0'>
        <div className='flex flex-col w-[45%] items-center'>
          <label className='mb-2'>
            Show next 10 Transactions
          </label>
          <button
            className='bg-slate-600 text-white hover:bg-slate-200 hover:text-slate-700 py-2 px-4 border border-red-950 rounded-md w-[50%]'
            onClick={handleNextButtonClick}>
            Next 10
          </button>  
        </div>
        <div className='flex flex-col w-[45%] items-center'>
          <label className='mb-2'>
            Reset Transactions Display
          </label>
          <button
            className='bg-slate-600 text-white hover:bg-slate-200 hover:text-slate-700 py-2 px-4 border border-red-950 rounded-md w-[50%]'
            onClick={handleResetButtonClick}>
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}
