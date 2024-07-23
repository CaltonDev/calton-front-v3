import React, { DependencyList, EffectCallback, useEffect, useRef } from 'react'

function useDeepCompareEffect(
    callback: EffectCallback,
    dependencies: DependencyList
): void {
    const currentDependenciesRef = useRef<DependencyList>()

    if (
        JSON.stringify(currentDependenciesRef.current) !==
        JSON.stringify(dependencies)
    ) {
        currentDependenciesRef.current = dependencies
    }

    useEffect(callback, [currentDependenciesRef.current])
}

function useOutsideClick(
    callback: () => void
): React.RefObject<HTMLDivElement> {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback()
            }
        }

        document.addEventListener('click', handleClick, true)

        return () => {
            document.removeEventListener('click', handleClick, true)
        }
    }, [callback])

    return ref
}

const Hooks = {
    useDeepCompareEffect,
    useOutsideClick,
}

export default Hooks
