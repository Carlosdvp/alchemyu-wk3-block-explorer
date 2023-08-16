import { Alchemy } from 'alchemy-sdk';
import { useState } from 'react';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
}
const alchemy = new Alchemy(settings);

export const TransactionDetails = () => {
  const [txHash, setTxHash] = useState('')
  const [txDetails, setTxDetails] = useState(null)

  const getTxDetails = async () => {
    try {
      const txData = await alchemy.core.getTransactionReceipt(txHash);
      setTxDetails(txData);
    } catch (error) {
      console.error('Error fetching Tx details', error)
    }
  }

  return (
    <div className='h-auto pl-6 bg-slate-300'>
      <h1 className='text-red-900 font-semibold text-2xl text-center py-10'>
        Transaction Details
      </h1>
      
      <div className='mb-4 px-4'>
        <label className='block p-2 bg-slate-500 text-white w-[25%]'>
          Enter a Transaction Hash:
        </label>
        <input
          type='text'
          className='border rounded w-[61%] py-2 px-1'
          value={txHash}
          onChange={(e) => setTxHash(e.target.value)} />

        <button
          className='bg-slate-600 text-white hover:bg-slate-200 hover:text-slate-700 p-2 ml-4 border'
          onClick={getTxDetails}>
          Get TX Details
        </button>
      </div>

      {txDetails && (
        <div className='px-4 py-6'>
          <p>From: {txDetails.from}</p>
          <p>To: {txDetails.to}</p>
          <p>Contract Address: {txDetails.contractAddress}</p>
          <p>Block Number: {txDetails.blockNumber}</p>
          <p>Tx Index: {txDetails.transactionIndex}</p>

        </div>
      )}
    </div>
  )
}
