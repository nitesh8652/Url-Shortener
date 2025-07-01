import React from "react";
import { useState } from "react";
import QRCode from 'react-qr-code';
import { useRef } from "react";

const QrPage = () => {
    const [inputurl, setInputurl] = useState('');
    const [qrValue, setQrValue] = useState('');
    const svgContainerRef = useRef(null)

    const handleGenerate = (e) => {
        e.preventDefault()
        setQrValue(inputurl)
    }

    const handledownload = () => {
        if (!svgContainerRef.current) return

        const svg = svgContainerRef.current.querySelector('svg')
        if (!svg) return

        const serializer = new XMLSerializer()
        const svgString = serializer.serializeToString(svg)

        const blob = new Blob([svgString], { type: 'image/svg+xml' })
        const url = URL.createObjectUrl(blob)


        const link = document.createElement('a')
        link.href = url;
        link.download = 'qrcode.svg';
        document.body.appendChild(link)
        link.click()
        link.remove()

        URL.revokeObjectURL(url)
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
                        <QRCode value={qrValue} />
                        <p className="mt-4 text-sm text-gray-600 break-all">{qrValue}</p>

  <button
            onClick={handledownload}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Download QR
          </button>

                    </div>
                )}

            </div>

        </>
    )
}

export default QrPage