import { useState } from 'react'
import { useProductStore } from '../store/productStore'

export const ProductEditor = () => {
    const { products, updateProduct } = useProductStore()
    const [selectedProduct, setSelectedProduct] = useState<number | null>(null)
    const [formData, setFormData] = useState({
        name: '',
        price: ''
    })

    // Manejador para cuando se selecciona un producto
    const handleProductSelect = (productId: number) => {
        const product = products.find(p => p.id === productId)
        if (product) {
            setSelectedProduct(productId)
            setFormData({
                name: product.name,
                price: product.price.toString()
            })
        }
    }

    // Manejador para cambios en el formulario
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    // Manejador para enviar el formulario
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (selectedProduct === null) return

        updateProduct(selectedProduct, {
            name: formData.name,
            price: Number(formData.price)
        })

        // Resetear el formulario
        setSelectedProduct(null)
        setFormData({ name: '', price: '' })
    }

    return (
        <div style={{ 
            padding: '20px', 
            border: '1px solid #ccc', 
            borderRadius: '5px', 
            margin: '10px' 
        }}>
            <h2>Editar Producto</h2>

            {/* Selector de producto */}
            <div style={{ marginBottom: '20px' }}>
                <label>
                    Seleccionar Producto:
                    <select 
                        value={selectedProduct || ''} 
                        onChange={(e) => handleProductSelect(Number(e.target.value))}
                        style={{ marginLeft: '10px' }}
                    >
                        <option value="">Seleccione un producto</option>
                        {products.map(product => (
                            <option key={product.id} value={product.id}>
                                {product.name}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            {/* Formulario de edición */}
            {selectedProduct && (
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '10px' }}>
                        <label>
                            Nombre:
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                style={{ marginLeft: '10px' }}
                                required
                            />
                        </label>
                    </div>

                    <div style={{ marginBottom: '10px' }}>
                        <label>
                            Precio:
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                style={{ marginLeft: '10px' }}
                                required
                                min="0"
                                step="0.01"
                            />
                        </label>
                    </div>

                    <button 
                        type="submit"
                        style={{
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            padding: '10px 15px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Guardar Cambios
                    </button>
                </form>
            )}
        </div>
    )
}