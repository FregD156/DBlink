const env = require('../config/env');
const { createClient } = require('@supabase/supabase-js');
let mockProducts = [];

try {
  mockProducts = require('../../../client/src/data/mock-products.json');
} catch (error) {
  console.log('Mock products file not found, initializing with empty list');
}

let supabase = null;
if (env.SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY) {
  supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
  console.log('Supabase client initialized on server');
} else {
  console.log('Supabase env missing, server running in fallback mock-data mode');
}

exports.getAllProducts = async (req, res) => {
  try {
    if (supabase) {
      const { data, error } = await supabase.from('products').select('*');
      if (error) throw error;
      return res.status(200).json(data);
    }
    
    // Fallback mode
    return res.status(200).json(mockProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

exports.getProductBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    if (supabase) {
      const { data, error } = await supabase.from('products').select('*').eq('slug', slug).single();
      if (error) throw error;
      return res.status(200).json(data);
    }
    
    // Fallback mode
    const product = mockProducts.find(p => p.slug === slug);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.error(`Error fetching product by slug ${slug}:`, error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
