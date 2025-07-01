import React from "react";
import { useState } from "react";
import QrCode from "qrcode.react";

const QrPage = () => {
    const [inputurl, setInputurl] = useState('');
    const [qrValue, setQrValue] = useState('');

    const handleGenerate = (e) => {
        e.preventDefault()
        setQrValue(inputurl)
    }

    return (

        <>

            <div className="min-h-screen flex flex-col items-center p-6 bg-gray-50">
                <h1 className="text-2xl font-semibold mb-6">Generate QR Code</h1>


                <form onSubmit={handleGenerate} className="w-full max-w-md space-y-4" >

                    <input
                        type="url"
                        placeholder="Enter URL"
                        value={inputurl}
                        onChange={(e) => setInputurl(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >Generate</button>

                </form>


                {qrValue && (
                    <div className="mt-8 flex flex-col items-center">
                        <QRCode value={qrValue} size={256} />
                        <p className="mt-4 text-sm text-gray-600 break-all">{qrValue}</p>
                    </div>
                )}

            </div>

        </>
    )
}

export default QrPage