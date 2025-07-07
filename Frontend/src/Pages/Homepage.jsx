import Form from '../Components/Form.jsx'

const Homepage = () => {
    return (
        <>

            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-2xl font-bold text-center mb-6">URL Shortener</h1>
                    <Form />
                </div>
            </div>

        </>
    )
}

export default Homepage