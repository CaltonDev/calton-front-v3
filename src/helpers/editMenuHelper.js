export function getEditMenuJson(
    itemName,
    menuDescription,
    itemPrice,
    tags,
    weight,
    weightUnits,
    cardImageThumb
) {
    return {
        labels: [
            {
                displayName: itemName,
                description: menuDescription,
            },
        ],
        attributes: {
            price: {
                currencyCode: 'EUR',
                units: itemPrice,
            },
            nutritionFacts: {
                calories: {
                    lowerAmount: null,
                    upperAmount: null,
                    unit: 'CALORIE',
                },
                totalFat: {
                    lowerAmount: null,
                    upperAmount: null,
                    unit: 'GRAM',
                },
                cholesterol: {
                    lowerAmount: null,
                    upperAmount: null,
                    unit: 'MILLIGRAM',
                },
                sodium: {
                    lowerAmount: null,
                    upperAmount: null,
                    unit: 'MILLIGRAM',
                },
                totalCarbohydrate: {
                    lowerAmount: null,
                    upperAmount: null,
                    unit: 'MILLIGRAM',
                },
                protein: {
                    lowerAmount: null,
                    upperAmount: null,
                    unit: 'MILLIGRAM',
                },
            },
            ingredients: [
                {
                    labels: tags.map((tag) => {
                        return {
                            displayName: tag,
                            description: null,
                            languageCode: 'it',
                        }
                    }),
                },
            ],
            servesNumPeople: 0,
            preparationMethods: [],
            portionSize: {
                quantity: weight,
                unit: {
                    displayName: weightUnits,
                },
            },
            mediaKeys: cardImageThumb ? [cardImageThumb] : [],
        },
        options: [],
    }
}

export function getIngredients(menuItem) {
    let ingredients = []

    menuItem?.attributes?.ingredients?.forEach((item) => {
        item.labels?.forEach((label) => {
            ingredients.push(label?.displayName)
        })
    })

    return ingredients
}
