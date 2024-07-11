import apiService from "./api/apiService";
import {getHeaders} from "./api/headers";

function getProductsUnFiltered(code) {
    const body = {
        code
    }
    return apiService.apiUrl.post('product/getFiltered', body, getHeaders())
}

function getProductsFiltered(allFilters, code, returnAnt) {
    const {selectedLocation, selectedChannel, selectedTopics, selectedProducts, selectedSource, customFilters} = allFilters;

    const body = {
        code,
        channels: selectedChannel,
        idSource: selectedSource,
        idLocations: selectedLocation,
        idTopics: selectedTopics,
        customFilters,
        selectedProducts,
        returnAnt
    }
    return apiService.apiUrl.post('product/getFiltered', body, getHeaders())
}

function removeProduct(_id) {
    const body = {
        _id
    }
    return apiService.apiUrl.post('product/remove', body, getHeaders())
}

const ProductsService = {
    getProductsUnFiltered,
    getProductsFiltered,
    removeProduct
}

export default ProductsService
