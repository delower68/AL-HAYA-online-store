import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  Plus as PlusIcon, 
  Trash2 as TrashIcon, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  Eye, 
  Search, 
  Plus, 
  Filter, 
  ExternalLink, 
  Package, 
  TrendingUp, 
  AlertCircle, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { PRODUCTS } from '../../constants';
import { cn } from '../../lib/utils';
import { Product } from '../../types';
import { AnimatePresence, motion } from 'motion/react';

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalMode, setModalMode] = useState<'ADD' | 'EDIT' | 'VIEW'>('ADD');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Form State
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    category: 'KHIMAR',
    price: 0,
    originalPrice: 0,
    description: '',
    image: '',
    gender: 'WOMEN',
    isNew: true,
    isTrending: false,
  });
  const [galleryLinks, setGalleryLinks] = useState<string[]>([]);
  const [newGalleryLink, setNewGalleryLink] = useState('');

  const resetForm = () => {
    setNewProduct({
      name: '',
      category: 'KHIMAR',
      price: 0,
      originalPrice: 0,
      description: '',
      image: '',
      gender: 'WOMEN',
      isNew: true,
      isTrending: false,
    });
    setGalleryLinks([]);
    setSelectedProductId(null);
  };

  const openModal = (mode: 'ADD' | 'EDIT' | 'VIEW', product?: Product) => {
    setModalMode(mode);
    if (product) {
      setSelectedProductId(product.id);
      setNewProduct(product);
      setGalleryLinks(product.gallery || []);
    } else {
      resetForm();
    }
    setShowAddModal(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalMode === 'VIEW') return;

    if (modalMode === 'EDIT' && selectedProductId) {
      setProducts(products.map(p => p.id === selectedProductId ? { ...p, ...newProduct, gallery: galleryLinks } as Product : p));
    } else {
      const product: Product = {
        id: (products.length + 1).toString(),
        name: newProduct.name || '',
        price: newProduct.price || 0,
        originalPrice: newProduct.originalPrice,
        category: newProduct.category || 'KHIMAR',
        gender: newProduct.gender || 'WOMEN',
        image: newProduct.image || '',
        rating: 4.5,
        isNew: newProduct.isNew,
        isTrending: newProduct.isTrending,
        description: newProduct.description || '',
        gallery: galleryLinks,
      };
      setProducts([product, ...products]);
    }
    
    setShowAddModal(false);
    resetForm();
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(prevProducts => prevProducts.filter(p => p.id !== id));
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Name', 'Category', 'Price', 'Original Price', 'Gender', 'Status'];
    const rows = products.map(p => [
      p.id,
      p.name,
      p.category,
      p.price,
      p.originalPrice || '',
      p.gender,
      p.isNew ? 'New' : 'Standard'
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `al-haya-inventory-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const addGalleryLink = () => {
    if (newGalleryLink.trim()) {
      setGalleryLinks([...galleryLinks, newGalleryLink]);
      setNewGalleryLink('');
    }
  };

  const removeGalleryLink = (index: number) => {
    setGalleryLinks(galleryLinks.filter((_, i) => i !== index));
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-20">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-3xl font-black uppercase tracking-tight text-black">Inventory Core</h1>
           <p className="text-gray-400 font-medium text-sm mt-1">Manage and curate your product collections.</p>
        </div>
        <button 
          onClick={() => openModal('ADD')}
          className="bg-black text-white px-8 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gold hover:text-black transition-all shadow-xl shadow-black/10 flex items-center space-x-3"
        >
          <Plus size={16} />
          <span>ADD PRODUCT</span>
        </button>
      </div>

      {/* Add Product Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
             <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowAddModal(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
             />
             <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl relative z-10 shadow-2xl p-8 custom-scrollbar"
             >
                <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-6">
                   <div>
                      <h2 className="text-2xl font-black uppercase tracking-tight text-black">
                        {modalMode === 'ADD' ? 'Add New Product' : modalMode === 'EDIT' ? 'Edit Product' : 'Product Details'}
                      </h2>
                      <p className="text-sm text-gray-400 font-medium">
                        {modalMode === 'VIEW' ? 'Viewing artifact specifications.' : 'Capture the essence of your new product.'}
                      </p>
                   </div>
                   <button 
                      onClick={() => setShowAddModal(false)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                   >
                      <X size={24} className="text-gray-400" />
                   </button>
                </div>

                <form onSubmit={handleSaveProduct} className="space-y-10">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      {/* Left Column: Media & Visuals */}
                      <div className="space-y-6">
                         <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-black/60">Product Cover Image (URL)</label>
                            <div className="relative group">
                               <input 
                                  type="text" 
                                  required
                                  disabled={modalMode === 'VIEW'}
                                  placeholder="https://images.unsplash.com/..."
                                  className="w-full bg-white border border-gray-200 p-4 rounded-xl outline-none focus:border-black transition-colors font-bold text-gray-500 text-sm disabled:opacity-50"
                                  value={newProduct.image || ''}
                                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                               />
                               <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                                  <Upload size={18} />
                               </div>
                            </div>
                            {newProduct.image && (
                               <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden border border-gray-100 mt-4 shadow-inner">
                                  <img src={newProduct.image} alt="Preview" className="w-full h-full object-cover" />
                               </div>
                            )}
                         </div>

                         <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-black/60">Gallery Products (Multiple Links)</label>
                            {modalMode !== 'VIEW' && (
                              <div className="flex gap-2">
                                <input 
                                    type="text" 
                                    placeholder="Add gallery image URL..."
                                    className="flex-1 bg-white border border-gray-200 p-3 rounded-xl outline-none focus:border-black transition-colors font-bold text-gray-500 text-sm"
                                    value={newGalleryLink}
                                    onChange={(e) => setNewGalleryLink(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addGalleryLink())}
                                />
                                <button 
                                    type="button"
                                    onClick={addGalleryLink}
                                    className="bg-black text-white px-4 rounded-xl hover:bg-gold hover:text-white transition-colors"
                                >
                                    <PlusIcon size={20} />
                                  </button>
                              </div>
                            )}
                            
                            <div className="grid grid-cols-4 gap-3">
                               {galleryLinks.map((link, idx) => (
                                  <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-gray-100 group">
                                     <img src={link} className="w-full h-full object-cover" />
                                     {modalMode !== 'VIEW' && (
                                        <button 
                                          type="button"
                                          onClick={() => removeGalleryLink(idx)}
                                          className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                          <X size={10} />
                                        </button>
                                     )}
                                  </div>
                               ))}
                            </div>
                         </div>
                      </div>

                      {/* Right Column: Taxonomy & Specs */}
                      <div className="space-y-6">
                         <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-black/60">Product Name</label>
                            <input 
                               type="text" 
                               required
                               disabled={modalMode === 'VIEW'}
                               placeholder="e.g. EBONY MIDNIGHT ABAYA"
                               className="w-full bg-white border border-gray-200 p-4 rounded-xl outline-none focus:border-black transition-colors font-bold text-gray-500 text-sm uppercase disabled:opacity-50"
                               value={newProduct.name || ''}
                               onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            />
                         </div>

                         <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-3">
                               <label className="text-[10px] font-black uppercase tracking-widest text-black/60">Category</label>
                               <select 
                                  disabled={modalMode === 'VIEW'}
                                  className="w-full bg-white border border-gray-200 p-4 rounded-xl outline-none focus:border-black transition-colors font-bold text-gray-500 text-sm disabled:opacity-50"
                                  value={newProduct.category || 'KHIMAR'}
                                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                               >
                                  <option value="KHIMAR">KHIMAR</option>
                                  <option value="HIJAB">HIJAB</option>
                                  <option value="ABAYA">ABAYA</option>
                                  <option value="JILBAB">JILBAB</option>
                                  <option value="PANJABI">PANJABI</option>
                                  <option value="PRAYER DRESS">PRAYER DRESS</option>
                               </select>
                            </div>
                            <div className="space-y-3">
                               <label className="text-[10px] font-black uppercase tracking-widest text-black/60">Target Group</label>
                               <select 
                                  disabled={modalMode === 'VIEW'}
                                  className="w-full bg-white border border-gray-200 p-4 rounded-xl outline-none focus:border-black transition-colors font-bold text-gray-500 text-sm disabled:opacity-50"
                                  value={newProduct.gender || 'WOMEN'}
                                  onChange={(e) => setNewProduct({ ...newProduct, gender: e.target.value as any })}
                               >
                                  <option value="WOMEN">WOMEN</option>
                                  <option value="MEN">MEN</option>
                                  <option value="KIDS">KIDS</option>
                               </select>
                            </div>
                         </div>

                         <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-3">
                               <label className="text-[10px] font-black uppercase tracking-widest text-black/60">Current Price (৳)</label>
                               <input 
                                  type="number" 
                                  required
                                  disabled={modalMode === 'VIEW'}
                                  className="w-full bg-white border border-gray-200 p-4 rounded-xl outline-none focus:border-black transition-colors font-bold text-gray-500 text-sm disabled:opacity-50"
                                  value={newProduct.price === undefined || newProduct.price === null || Number.isNaN(newProduct.price) ? '' : newProduct.price}
                                  onChange={(e) => {
                                    const val = parseFloat(e.target.value);
                                    setNewProduct({ ...newProduct, price: isNaN(val) ? undefined : val });
                                  }}
                               />
                            </div>
                            <div className="space-y-3">
                               <label className="text-[10px] font-black uppercase tracking-widest text-black/60">Retail Price (৳)</label>
                               <input 
                                  type="number" 
                                  disabled={modalMode === 'VIEW'}
                                  className="w-full bg-white border border-gray-200 p-4 rounded-xl outline-none focus:border-black transition-colors font-bold text-gray-500 text-sm disabled:opacity-50"
                                  value={newProduct.originalPrice === undefined || newProduct.originalPrice === null || Number.isNaN(newProduct.originalPrice) ? '' : newProduct.originalPrice}
                                  onChange={(e) => {
                                    const val = parseFloat(e.target.value);
                                    setNewProduct({ ...newProduct, originalPrice: isNaN(val) ? undefined : val });
                                  }}
                               />
                            </div>
                         </div>

                         <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-black/60">Product Description</label>
                            <textarea 
                               disabled={modalMode === 'VIEW'}
                               placeholder="Describe the soul of this product..."
                               className="w-full bg-white border border-gray-200 p-4 rounded-xl outline-none focus:border-black transition-colors font-bold text-gray-500 text-sm min-h-[120px] resize-none disabled:opacity-50"
                               value={newProduct.description || ''}
                               onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                            />
                         </div>

                         <div className="flex items-center space-x-8 pt-4">
                            <label className="flex items-center space-x-3 cursor-pointer group">
                               <div className={cn(
                                  "w-10 h-6 rounded-full transition-colors relative",
                                  newProduct.isTrending ? "bg-gold" : "bg-gray-200"
                               )}>
                                  <input 
                                     type="checkbox" 
                                     disabled={modalMode === 'VIEW'}
                                     className="hidden" 
                                     checked={newProduct.isTrending}
                                     onChange={(e) => setNewProduct({ ...newProduct, isTrending: e.target.checked })}
                                  />
                                  <div className={cn(
                                     "absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-sm",
                                     newProduct.isTrending ? "left-5" : "left-1"
                                  )} />
                               </div>
                               <span className="text-[10px] font-black uppercase tracking-widest">Trending</span>
                            </label>

                            <label className="flex items-center space-x-3 cursor-pointer group">
                               <div className={cn(
                                  "w-10 h-6 rounded-full transition-colors relative",
                                  newProduct.isNew ? "bg-black" : "bg-gray-200"
                               )}>
                                  <input 
                                     type="checkbox" 
                                     disabled={modalMode === 'VIEW'}
                                     className="hidden" 
                                     checked={newProduct.isNew}
                                     onChange={(e) => setNewProduct({ ...newProduct, isNew: e.target.checked })}
                                  />
                                  <div className={cn(
                                     "absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-sm",
                                     newProduct.isNew ? "left-5" : "left-1"
                                  )} />
                               </div>
                               <span className="text-[10px] font-black uppercase tracking-widest">New Session</span>
                            </label>
                         </div>
                      </div>
                   </div>

                   <div className="flex items-center justify-end space-x-4 pt-8 border-t border-gray-100">
                      <button 
                         type="button"
                         onClick={() => setShowAddModal(false)}
                         className="px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
                      >
                         {modalMode === 'VIEW' ? 'Close' : 'Discard'}
                      </button>
                      {modalMode !== 'VIEW' && (
                        <button 
                           type="submit"
                           className="bg-black text-white px-12 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gold hover:text-black transition-all shadow-xl shadow-black/10"
                        >
                           {modalMode === 'ADD' ? 'Authorize & Publish' : 'Update Artifact'}
                        </button>
                      )}
                   </div>
                </form>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Analytics Mini-Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
            { label: 'Total Stock', value: '4,284 Units', icon: Package, color: 'text-blue-600' },
            { label: 'Low Stock Alerts', value: '12 Items', icon: AlertCircle, color: 'text-red-500' },
            { label: 'Best Seller', value: 'Matrix Hoodie', icon: TrendingUp, color: 'text-gold' }
         ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center space-x-5">
               <div className={cn("p-4 rounded-xl bg-gray-50", stat.color)}>
                  <stat.icon size={24} />
               </div>
               <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{stat.label}</p>
                  <h4 className="text-xl font-black text-black">{stat.value}</h4>
               </div>
            </div>
         ))}
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
         {/* Filters bar */}
         <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
               <input 
                  type="text"
                  placeholder="Filter by name, SKU or category..."
                  className="w-full bg-gray-50 border border-gray-100 p-3 pl-12 rounded-xl outline-none focus:border-black transition-colors font-medium text-black text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
            <div className="flex items-center space-x-3 w-full md:w-auto">
               <button className="flex-1 md:flex-none flex items-center justify-center space-x-2 bg-gray-50 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
                  <Filter size={16} />
                  <span>Advanced Filters</span>
               </button>
               <button 
                  onClick={exportToCSV}
                  className="flex-1 md:flex-none flex items-center justify-center space-x-2 bg-gray-50 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
                >
                  <ExternalLink size={16} />
                  <span>Export CSV</span>
               </button>
            </div>
         </div>

         {/* Product Table */}
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-gray-50/50">
                     <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Product</th>
                     <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Category</th>
                     <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Inventory</th>
                     <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Pricing</th>
                     <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                     <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 border-b border-transparent hover:border-gray-100 transition-all group">
                       <td className="px-8 py-5">
                          <div className="flex items-center space-x-4">
                             <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 border border-gray-100 flex-shrink-0">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                             </div>
                             <div>
                                <p className="text-sm font-black text-black group-hover:text-gold transition-colors">{product.name}</p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">SKU: HAY-{product.id}00X</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-5">
                          <span className="text-[10px] font-black uppercase tracking-widest bg-gray-100 px-3 py-1 rounded-full text-gray-600">
                             {product.category}
                          </span>
                       </td>
                       <td className="px-8 py-5">
                           <div className="flex items-center space-x-2">
                              <div className="w-24 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                 <div className="w-[80%] h-full bg-green-500 rounded-full" />
                              </div>
                              <span className="text-[11px] font-black text-black">124</span>
                           </div>
                           <p className="text-[9px] font-bold text-gray-400 mt-1 uppercase tracking-widest">In Stock</p>
                       </td>
                       <td className="px-8 py-5">
                          <div>
                             <p className="text-sm font-black text-black">৳{product.price}</p>
                             {product.originalPrice && (
                                <p className="text-[10px] text-gray-400 line-through">৳{product.originalPrice}</p>
                             )}
                          </div>
                       </td>
                       <td className="px-8 py-5">
                          <div className="flex items-center space-x-2">
                             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                             <span className="text-[10px] font-black uppercase tracking-widest text-green-600">Active</span>
                          </div>
                       </td>
                       <td className="px-8 py-5">
                          <div className="flex items-center space-x-2 transition-opacity">
                             <button 
                                onClick={() => openModal('EDIT', product)}
                                className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all" 
                                title="Edit"
                             >
                                <Edit3 size={18} />
                             </button>
                             <button 
                                onClick={() => openModal('VIEW', product)}
                                className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-all" 
                                title="Preview"
                             >
                                <Eye size={18} />
                             </button>
                             <button 
                                onClick={() => handleDeleteProduct(product.id)}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" 
                                title="Delete"
                             >
                                <Trash2 size={18} />
                             </button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>

         {/* Pagination */}
         <div className="p-8 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
               Showing <span className="text-black">1-10</span> of <span className="text-black">42</span> Products
            </p>
            <div className="flex items-center space-x-2">
               <button className="p-2 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors text-gray-400 disabled:opacity-30" disabled>
                  <ChevronLeft size={20} />
               </button>
               <div className="flex items-center space-x-1 px-4">
                  {[1, 2, 3].map((page) => (
                    <button key={page} className={cn(
                       "w-8 h-8 rounded-lg text-xs font-black transition-all",
                       page === 1 ? "bg-black text-white" : "text-gray-400 hover:bg-gray-50 hover:text-black"
                    )}>
                       {page}
                    </button>
                  ))}
               </div>
               <button className="p-2 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors text-gray-400">
                  <ChevronRight size={20} />
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
