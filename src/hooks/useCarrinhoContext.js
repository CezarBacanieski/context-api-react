import { useContext } from 'react';
import { CarrinhoContext } from '@/context/CarrinhoContext.jsx';

export const useCarrinhoContext = () => {
  const { carrinho, setCarrinho } = useContext(CarrinhoContext);

  function adicionarProduto(novoProduto) {
    const temProduto = carrinho.some((itemDoCarrinho) => {
      itemDoCarrinho.id === novoProduto.id;
    });

    if (!temProduto) {
      novoProduto.quantidade = 1;
      return setCarrinho((carrinhoAnterior) => [
        ...carrinhoAnterior,
        novoProduto,
      ]);
    }

    setCarrinho((carrinhoAnterior) =>
      carrinhoAnterior.map((itemDoCarrinho) => {
        if (itemDoCarrinho.id === novoProduto.id)
          itemDoCarrinho.quantidade += 1;
        return itemDoCarrinho;
      })
    );
  }

  function removerProduto(id) {
    const temProduto = carrinho.find((itemDoCarrinho) => {
      itemDoCarrinho.id === id;
    });

    if (temProduto.quantidade === 1) {
      return setCarrinho((carrinhoAnterior) =>
        carrinhoAnterior.filter((itemDoCarrinho) => itemDoCarrinho.id !== id)
      );
    }

    setCarrinho((carrinhoAnterior) =>
      carrinhoAnterior.map((itemDoCarrinho) => {
        if (itemDoCarrinho.id === id) itemDoCarrinho.quantidade -= 1;
        return itemDoCarrinho;
      })
    );
  }

  return {
    carrinho,
    setCarrinho,
    adicionarProduto,
    removerProduto,
  };
};
