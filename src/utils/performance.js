// Utilidades para optimización de rendimiento

// Debounce function para evitar llamadas excesivas
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function para limitar la frecuencia de ejecución
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Memoización simple para funciones costosas
export const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
};

// Lazy loading para componentes
export const lazyLoad = (importFunc) => {
  return React.lazy(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(importFunc());
      }, 100); // Pequeño delay para evitar bloqueo
    });
  });
};

// Optimización de imágenes
export const optimizeImage = (src, width = 400) => {
  if (!src) return src;
  
  // Si es una URL externa, agregar parámetros de optimización
  if (src.startsWith('http')) {
    const url = new URL(src);
    url.searchParams.set('w', width.toString());
    url.searchParams.set('q', '80');
    return url.toString();
  }
  
  return src;
};

// Virtualización para listas largas
export const createVirtualizedList = (items, itemHeight, containerHeight) => {
  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const totalHeight = items.length * itemHeight;
  
  return {
    visibleCount,
    totalHeight,
    getVisibleRange: (scrollTop) => {
      const start = Math.floor(scrollTop / itemHeight);
      const end = Math.min(start + visibleCount, items.length);
      return { start, end };
    },
    getOffsetY: (index) => index * itemHeight
  };
};

// Optimización de re-renders con React.memo
export const createOptimizedComponent = (Component, propsAreEqual) => {
  return React.memo(Component, propsAreEqual);
};

// Cache para datos de API
export class DataCache {
  constructor(maxAge = 5 * 60 * 1000) { // 5 minutos por defecto
    this.cache = new Map();
    this.maxAge = maxAge;
  }

  set(key, value) {
    this.cache.set(key, {
      value,
      timestamp: Date.now()
    });
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() - item.timestamp > this.maxAge) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }

  clear() {
    this.cache.clear();
  }

  size() {
    return this.cache.size;
  }
}

// Optimización de eventos
export const createEventOptimizer = () => {
  const listeners = new Map();
  
  return {
    addListener: (event, callback, options = {}) => {
      const { passive = true, once = false } = options;
      const listener = { callback, passive, once };
      listeners.set(event, listener);
      
      document.addEventListener(event, callback, { passive, once });
    },
    
    removeListener: (event) => {
      const listener = listeners.get(event);
      if (listener) {
        document.removeEventListener(event, listener.callback);
        listeners.delete(event);
      }
    },
    
    clearAll: () => {
      listeners.forEach((listener, event) => {
        document.removeEventListener(event, listener.callback);
      });
      listeners.clear();
    }
  };
};

// Optimización de animaciones
export const createAnimationOptimizer = () => {
  let animationFrameId = null;
  
  return {
    requestAnimationFrame: (callback) => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      animationFrameId = requestAnimationFrame(callback);
    },
    
    cancelAnimationFrame: () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    }
  };
};

// Optimización de scroll
export const createScrollOptimizer = (callback, options = {}) => {
  const { throttleMs = 16 } = options; // ~60fps
  let ticking = false;
  
  const update = () => {
    callback();
    ticking = false;
  };
  
  const requestTick = () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  };
  
  return throttle(requestTick, throttleMs);
};

// Optimización de resize
export const createResizeOptimizer = (callback) => {
  return debounce(callback, 250);
};

// Optimización de búsqueda
export const createSearchOptimizer = (searchFunction, delay = 300) => {
  return debounce(searchFunction, delay);
};

// Optimización de formularios
export const createFormOptimizer = (validationFunction, delay = 500) => {
  return debounce(validationFunction, delay);
};

// Utilidad para detectar si el dispositivo es móvil
export const isMobile = () => {
  return window.innerWidth <= 768;
};

// Utilidad para detectar si el dispositivo tiene conexión lenta
export const isSlowConnection = () => {
  return navigator.connection && 
         (navigator.connection.effectiveType === 'slow-2g' || 
          navigator.connection.effectiveType === '2g' ||
          navigator.connection.effectiveType === '3g');
};

// Utilidad para precargar recursos críticos
export const preloadCriticalResources = (resources) => {
  resources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.url;
    link.as = resource.type || 'fetch';
    document.head.appendChild(link);
  });
};

// Utilidad para optimizar el bundle
export const createBundleOptimizer = () => {
  const loadedModules = new Set();
  
  return {
    loadModule: async (modulePath) => {
      if (loadedModules.has(modulePath)) {
        return;
      }
      
      try {
        await import(modulePath);
        loadedModules.add(modulePath);
      } catch (error) {
        console.warn(`Failed to load module: ${modulePath}`, error);
      }
    },
    
    isLoaded: (modulePath) => loadedModules.has(modulePath),
    
    getLoadedModules: () => Array.from(loadedModules)
  };
};

// Configuración de performance
export const performanceConfig = {
  // Configuración para lazy loading
  lazyLoading: {
    threshold: 0.1,
    rootMargin: '50px'
  },
  
  // Configuración para cache
  cache: {
    maxAge: 5 * 60 * 1000, // 5 minutos
    maxSize: 100
  },
  
  // Configuración para debounce/throttle
  timing: {
    search: 300,
    scroll: 16,
    resize: 250,
    form: 500
  },
  
  // Configuración para virtualización
  virtualization: {
    itemHeight: 60,
    overscan: 5
  }
};

export default {
  debounce,
  throttle,
  memoize,
  lazyLoad,
  optimizeImage,
  createVirtualizedList,
  createOptimizedComponent,
  DataCache,
  createEventOptimizer,
  createAnimationOptimizer,
  createScrollOptimizer,
  createResizeOptimizer,
  createSearchOptimizer,
  createFormOptimizer,
  isMobile,
  isSlowConnection,
  preloadCriticalResources,
  createBundleOptimizer,
  performanceConfig
}; 