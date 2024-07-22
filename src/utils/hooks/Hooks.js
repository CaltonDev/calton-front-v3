import { useEffect, useRef } from 'react'

function useDeepCompareEffect(callback, dependencies) {
    const currentDependenciesRef = useRef()

    if (
        JSON.stringify(currentDependenciesRef.current) !==
        JSON.stringify(dependencies)
    ) {
        currentDependenciesRef.current = dependencies
    }

    useEffect(callback, [currentDependenciesRef.current])
}

const Hooks = {
    useDeepCompareEffect,
}

export default Hooks
