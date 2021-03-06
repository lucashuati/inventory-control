import React, { useMemo, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import Table from '../../components/common/table/Table';
import ContainerPage from '../../components/common/Container';
import ListProductReducer from '../../reducers/products/ListProductReducer';
import { fetchProducts } from '../../services/product/fetch';
import Loading from '../../components/common/Loading';
import Button from '../../components/common/Button';
import deleteProduct from '../../services/product/delete';


const ListProductPage = ({ history }) => {
  const initalState = {
    products: [],
    fetchingProducts: false,
    fetchProductsError: false,
  };
  const [state, dispatch] = useReducer(ListProductReducer, initalState);

  const handleRemoveProduct = async (productId) => {
    dispatch({ type: 'REMOVE_PRODUCT', payload: productId });
    try {
      await deleteProduct(productId);
      toast.success('Produto removido com sucesso');
    } catch {
      toast.error('Ocorreu um erro ao remover o produto');
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Nome do produto',
        accessor: 'name',
      },
      {
        Header: 'Número de Unidades',
        accessor: 'quantity',
      },
      {
        Header: 'Valor Unitário',
        accessor: 'currency_unit_value',
      },
      {
        Header: 'Ações',
        accessor: 'id',
        Cell: (row) => {
          const productId = get(row, 'cell.value');
          return (
            <>
              <Button onClick={() => history.push(`/products/${productId}`)} type="default">Editar</Button>
              <Button onClick={() => handleRemoveProduct(productId)} type="danger">Remover</Button>
            </>
          );
        },
      },
    ], [history],
  );

  useEffect(() => {
    dispatch({ type: 'SET_FETCHING_PRODUCTS', payload: true });
    const fetchData = async () => {
      try {
        const result = await fetchProducts();
        dispatch({ type: 'SET_PRODUCTS', payload: result });
      } catch {
        dispatch({ type: 'SET_FETCH_PRODUCTS_ERROR' });
      }
    };
    fetchData();
  }, []);

  return (
    <ContainerPage title="Produtos">
      <Loading loading={state.fetchingProducts}>
        <>
          <div className="float-right">
            <Button onClick={() => history.push('/products')}>Novo Produto</Button>
          </div>
          {state.fetchProductsError ? (
            <p className="center">Ocorreu um erro ao carregar os produtos. Por favor, tente novamente</p>
          ) : <Table columns={columns} data={state.products} />}
        </>
      </Loading>
    </ContainerPage>
  );
};

ListProductPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ListProductPage;
