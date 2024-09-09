import apiService from './api/apiService'
import { getHeaders } from './api/headers'
import { AllFiltersInterface } from './interfaces/interfaces'
import { useQuery } from 'react-query'

interface GetProductsUnFilteredBody {
    code: number[]
}

interface GetProductsFilteredBody extends GetProductsUnFilteredBody {
    code: number[]
    channels: string[]
    idSource: string[]
    idLocations: string[]
    idTopics: string[]
    customFilters: any[]
    selectedProducts: string[]
    returnAnt: boolean
}

interface RemoveProductBody {
    _id: string
}

function getProductsUnFiltered(code: number[]) {
    const body: GetProductsUnFilteredBody = { code }
    return apiService.apiUrl.post('/product/getFiltered', body, getHeaders())
}

function getProductsFiltered(
    allFilters: AllFiltersInterface,
    code: number[],
    returnAnt: boolean
) {
    const {
        selectedLocation,
        selectedChannel,
        selectedTopics,
        selectedProducts,
        selectedSource,
        customFilters,
    } = allFilters

    const body: GetProductsFilteredBody = {
        code,
        channels: selectedChannel,
        idSource: selectedSource,
        idLocations: selectedLocation,
        idTopics: selectedTopics,
        customFilters,
        selectedProducts,
        returnAnt,
    }

    return useQuery<any, Error>(
        ['productsFiltered'],
        () =>
            apiService.apiUrl.post('/product/getFiltered', body, getHeaders()),
        {
            staleTime: 0,
        }
    )
}

function removeProduct(_id: string) {
    const body: RemoveProductBody = { _id }
    return apiService.apiUrl.post('/product/remove', body, getHeaders())
}

const ProductsService = {
    getProductsUnFiltered,
    getProductsFiltered,
    removeProduct,
}

export default ProductsService
