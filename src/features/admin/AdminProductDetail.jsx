// modules
import React, { useEffect, useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';

// state
import { RootStoreContext } from '../../app/stores/rootStore';

// components
import LoadingComponent from '../../app/layout/LoadingComponent';

// uploads url
const uploadsUrl = process.env.REACT_APP_UPLOADS_URL;

const AdminProductDetail = ({ match, history }) => {
    const rootStore = useContext(RootStoreContext);
    const { product, loadProduct, loadingInitial, editProduct, uploadProductPhoto } = rootStore.adminStore;
    const { loadCategories, categories } = rootStore.categoryStore;

    const [formData, _setFormData] = useState({
        _id: match.params.id,
        name: '',
        category: '',
        description: '',
        stock: {
            quantity: 0,
            unitOfMeasure: 'Piece',
        },
        unitPrice: 0,
        photo: 'no-photo.jpg',
    });

    useEffect(() => {
        loadProduct(match.params.id);
    }, [loadProduct, match.params.id, history]);

    useEffect(() => {
        loadCategories();
    }, [loadCategories]);

    useEffect(() => {
        if (product) {
            _setFormData({
                _id: product._id,
                name: product.name,
                category: product.category,
                description: product.description,
                stock: {
                    quantity: product.stock.quantity,
                    unitOfMeasure: product.stock.unitOfMeasure,
                },
                unitPrice: product.unitPrice,
                photo: product.photo,
            });
        }
    }, [product]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        editProduct(formData);
    };

    const handleFileUpload = (e) => {
        e.preventDefault();

        if (e.target.files[0]) {
            uploadProductPhoto(product, e.target.files[0]);
        }
    };

    if (loadingInitial) return <LoadingComponent content="Loading product..." />;

    if (!product) return <h2>Product not found</h2>;

    return (
        <div className="container mt-3">
            <div className="row">
                <aside className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title mb-4">Product Details - {product.name}</h4>
                            <form onSubmit={handleFormSubmit}>
                                <div className="form-row">
                                    <div className="col form-group">
                                        <label>Product Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder=""
                                            value={formData.name}
                                            onChange={(e) => _setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="col form-group">
                                        <label>Product Category</label>
                                        <select
                                            className="form-control"
                                            value={formData.category}
                                            onChange={(e) => _setFormData({ ...formData, category: e.target.value })}
                                        >
                                            <option>Select</option>
                                            {categories.map((category) => (
                                                <option value={category._id} key={category._id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Product Description</label>
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        onChange={(e) => _setFormData({ ...formData, description: e.target.value })}
                                        value={formData.description}
                                    ></textarea>
                                </div>
                                <div className="form-row">
                                    <div className="col form-group">
                                        <label>Available Quantity</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder=""
                                            value={formData.stock.quantity}
                                            onChange={(e) =>
                                                _setFormData({
                                                    ...formData,
                                                    stock: { ...formData.stock, quantity: e.target.value },
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="col form-group">
                                        <label>Unit Price</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder=""
                                            value={formData.unitPrice}
                                            onChange={(e) =>
                                                _setFormData({
                                                    ...formData,
                                                    unitPrice: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <img src={`${uploadsUrl}/${product.photo}`} width={100} alt="product" />
                                </div>
                                <div className="form-group">
                                    <label>
                                        <input type="file" className="form-control-file" onChange={handleFileUpload} />
                                    </label>
                                </div>
                                <button className="btn btn-primary btn-block" type="submit">
                                    Save
                                </button>
                                <button className="btn btn-danger btn-block" type="button">
                                    Delete
                                </button>
                            </form>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default observer(AdminProductDetail);
