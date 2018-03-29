import React, { Component } from 'react';
class Content extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Positions: this.props.JobPositions,
      ParentIndex: this.props.ParentIndex
    };
  }


  /**
   * [changeState] 子组件选择状态改变
   * @param { Number } index 当前操作的子组件的下标
  */
  changeState(index){
    let positions = this.state.Positions
    positions[index].checked = !positions[index].checked
    this.setState({ Positions: positions},() =>{
      let flag = []
      for (let i = 0, len = this.state.Positions.length; i < len; i++) {
        flag[i] = this.state.Positions[i].checked?true:false
      }
      if(flag.indexOf(true) === -1){
        this.props.UpdataState(this.state.ParentIndex, this.state.Positions,false)
      }else{
        this.props.UpdataState(this.state.ParentIndex, this.state.Positions, true)
      }
    })

  }
  
  render(props){
    var reactid = 0
    return (
      <ul>
        {
          this.state.Positions.map((item, index, arr) => {
            return (
              <li key={reactid++}>
                <input type="checkbox" defaultChecked={item.checked} onChange={this.changeState.bind(this,index)} />
                <i className="iconfont"> </i>
                <span>{item.jobName} </span>
                <span className="fr number" > {item.sum} </span>
              </li>
            )
          })
        }
      </ul>
    )
  }

}

export default Content;





