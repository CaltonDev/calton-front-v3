import apiService from './api/apiService'
import { getHeaders } from './api/headers'
import { AllFiltersInterface } from './interfaces/interfaces'

interface GetProductsUnFilteredBody {
    code: string
}

interface GetProductsFilteredBody extends GetProductsUnFilteredBody {
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

function getProductsUnFiltered(code: string) {
    const body: GetProductsUnFilteredBody = { code }
    return apiService.apiUrl.post('/product/getFiltered', body, getHeaders())
}

function getProductsFiltered(
    allFilters: AllFiltersInterface,
    code: string,
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

    return apiService.apiUrl.post('/product/getFiltered', body, getHeaders())
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
