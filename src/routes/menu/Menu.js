import React from "react";
import MenuCategories from "./MenuCategories";
import MenuItem from "./MenuItem";
import ReactPaginate from 'react-paginate';
import { useState, useEffect } from "react";
import ResetLocation from "../../helpers/ResetLocation";
import { motion } from "framer-motion";

const Menu = ({ allProducts,
  activeCategory,
  allCategories,
  changeCategory,
  handleAddProduct,
  handleRemoveProduct,
  successMsg,
  findMenuItem
}) => {

  const [itemOffset, setItemOffset] = useState(0);
  const [endOffset, setEndOffset] = useState(itemOffset + 5);
  const [currentProducts, setcurrentProducts] = useState([...allProducts].reverse().slice(itemOffset, endOffset));
  const [pageCountProducts, setpageCountProducts] = useState(Math.ceil(allProducts.length / 5));

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 5) % allProducts.length;
    setItemOffset(newOffset);
    ResetLocation();
  };
  const resetPagination = () => {
    setItemOffset(0);
    setEndOffset(5);
  }
  useEffect(() => {
    document.title = `${activeCategory} | Cardap.io`;
    setEndOffset(itemOffset + 5);
    setcurrentProducts([...allProducts].reverse().slice(itemOffset, endOffset));
    setpageCountProducts(Math.ceil(allProducts.length / 5));

  }, [allProducts, setEndOffset, endOffset, itemOffset, activeCategory]);
  return (
    <motion.div
    initial={{ opacity: 0, translateX: -300  }}
    whileInView={{ opacity: 1 , translateX: 0  }}
      exit={{ opacity: 0,  translateX: -300  }}
      transition={{ duration: 1}}
    >
    <main className="menu-main">
      <MenuCategories
        activeCategory={activeCategory}
        allCategories={allCategories}
        changeCategory={changeCategory}
        resetPagination={resetPagination}
        findMenuItem={findMenuItem}
      />
      {currentProducts.length === 0 ? <article className="pizza-section"><p className="nothing-found">No results found... </p></article> :
        <article className="pizza-section">
          {currentProducts.map((singleProduct) => (
            <MenuItem

              key={singleProduct.id}
              singleProduct={singleProduct}
              handleAddProduct={handleAddProduct}
              handleRemoveProduct={handleRemoveProduct}
              successMsg={successMsg}
            />
          ))
          }
        </article>}

      <ReactPaginate
        className="pagination"
        breakLabel="..."
        nextLabel=" &#62;"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCountProducts}
        previousLabel="&#60;"
        renderOnZeroPageCount={null}
      />
    </main>
    </motion.div>
  );
}


export default Menu;