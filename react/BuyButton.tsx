import * as React from 'react'
import axios from 'axios'

interface BuyButtonProps {
  skuItems: any
}

interface BuyButtonState {
  prodUrl: string
}

class BuyButton extends React.Component<BuyButtonProps, BuyButtonState> {
  state = {
    prodUrl: ""
  }

  componentDidMount() {
    console.log('OOOOO', this.props.skuItems)
    axios.get(`https://api.gocommerce.com/gc-mxo4581/search/products${window.location.pathname}`)
      .then(res => {
        const product = res.data;
        if(product && product.length > 0) {
          const prodURL = product[0].SellerUrl && product[0].SellerUrl[0]
          if(prodURL) {
            const prodURLNew = new URL(prodURL)
            const carrinhoURL = `${prodURLNew.protocol}//${prodURLNew.host}/carrinho/produto/PRDUCTID/adicionar`
            this.setState({
              prodUrl: product.length === 1 ? carrinhoURL : prodURL
            });
          }
        }
      })
  }

  render() {
    const { prodUrl } = this.state
    const { skuItems } = this.props
    const linkURL = prodUrl.replace('PRDUCTID', skuItems[0].skuId)
    return (
      <a href={linkURL} target="_blank">
        <button type="button" className="vtex-button bw1 ba fw5 v-mid relative pa0 br2 min-h-regular t-action bg-action-primary b--action-primary c-on-action-primary hover-bg-action-primary hover-b--action-primary hover-c-on-action-primary pointer w-100 "><div className="flex items-center justify-center h-100 pv2 ph6 ">Adicionar ao carrinho</div></button>
      </a>
    )
  }
}

export default BuyButton
