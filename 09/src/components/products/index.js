import { useEffect } from 'react';
import { connect } from 'dva';
import { Spin, Card, Image } from 'antd';
import p from "./index.less";

function Products({ state, dispatch, onClick }) {
  useEffect(() => {
    dispatch({ type: 'products/getProducts' });
  }, [dispatch]);

  const { data, loading } = state.products;
  const { cart } = state.cart;

  // 添加购物车
  function addToCart(product) {
    dispatch({ type: 'cart/addToCart', payload: { cart, product } });
  }

  return (
    <div className={p.products_box}>
      <div className={p.title}>
        <span>{data.length} Product(s) found.</span>
        <div className={p.sort}>
          <span>Order by</span>
          <select onChange={(e) => onClick(e.target.value)}>
            <option value="default">Select</option>
            <option value="+price">Lowest to highest</option>
            <option value="-price">Highest to lowest</option>
          </select>
        </div>
      </div>
      <div>
        <Spin
          tip="Loading ..."
          spinning={loading}
          style={{ width: "100%", marginTop: "20%" }}
        />
        <Card className={p.card}>
          {
            data.map(item => (
              <Card.Grid
                key={item.id}
                hoverable={true}
                className={p.carditem}
              >
                <Image
                  preview={false}
                  src={`./img/${item.sku}_1.jpg`}
                  className={p.cardimg} />
                <span className={p.free}>Free shipping</span>
                <h3 className={p.cardtitle}>{item.title}</h3>
                <p className={p.size}>{item.availableSizes.join(" ")}</p>
                <p className={p.price}>
                  $&nbsp;
                  <span>
                    {item.price.toFixed(2)}
                  </span>
                </p>
                <p
                  style={{ opacity: item.installments ? 1 : 0 }}
                  className={p.single}>
                  or {item.installments} ×
                  <span>
                    ${(item.price / item.installments).toFixed(2)}
                  </span>
                </p>
                <button
                  onClick={() => addToCart(item)}
                  className={p.add}
                  type="button">
                  Add to cart
                </button>
              </Card.Grid >
            ))
          }
        </Card>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({ state })

export default connect(mapStateToProps)(Products);