import { createRoot } from 'react-dom/client'
import './index.css'
import App from './RootLayout.jsx'
import { RouterProvider ,createRouter } from '@tanstack/react-router'   
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { routeTree } from './Routing/RouteTree.js'
import { Provider } from 'react-redux'
import store from './Store/Store.js'

const queryClient = new QueryClient()
const router = createRouter ({routeTree,
    context:{
        queryClient,
        store
    }
})

createRoot(document.getElementById('root')).render(

<Provider store={store}>

<QueryClientProvider client={queryClient}>
    <RouterProvider router={router}/>
</QueryClientProvider>

</Provider>

)
