import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import { ActivityIndicator, WingBlank, ListView,SearchBar,PullToRefresh} from 'antd-mobile';
import {NavLink,HashRouter} from 'react-router-dom'
import {getCommentCount} from '../../utils/utils'
import {connect} from 'react-redux'
import {actionCreators} from './store'
import './style.less'
class Home extends Component{
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            dataSource,
            refreshing: true,
            isLoading: true,
            page:1,
            height: document.documentElement.clientHeight,
            useBodyScroll: false,
        };
        this.changeState = this.changeState.bind(this)
    }
    changeState(list){
        const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
        this.setState({
            height:hei,
            dataSource: this.state.dataSource.cloneWithRows(list)
        })
    }
      componentDidMount() {
        this.props.getHomeList()
    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.changeState(nextProps.list)
        this.setState({
            refreshing: false,
            isLoading: false,
            height:document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).offsetTop,
            page:(nextProps.page.next?++this.state.page:'')
        });

    }

    /**
     * TODO 获取评论数
     * @param item
     * @returns {*}
     */
   /* getCommentCount(item){
        let count = 0;
        item.article_comment_set.map(el=>{
             count+=el.articlecommentreply_set.length
        })
        return count+=item.article_comment_set.length
    }*/
    submit(){
        console.log('search')
    }
   /**
    *TODO 下拉刷新
    */
    onRefresh=()=>{
        this.setState({ refreshing: true, isLoading: true,page:1 });
        this.props.getHomeList()
    }
    /**
     * TODO 滚动加载数据
     */
    onEndReached = ()=>{
        if(this.state.page){
            this.setState({ refreshing: true, isLoading: true, });
            this.props.getHomePage(this.state.page);
        }

    }
    render() {

        const {isShow} = this.props
        const row =  (rowData, sectionID, rowID) => {
            return(
                <HashRouter>
                <div className='list'>
                    <div>
                        <div className='list-header'>
                            <div className='list-header-left one-txt-cut'>
                                <img src={rowData.authors.user_imag?rowData.authors.user_imag:rowData.authors.user_image} alt=""/>
                                {rowData.authors.username}
                            </div>
                            <div className='list-header-right'><span>{rowData.category.name}</span></div>
                        </div>
                        <div className='list-title'>
                            <div className='list-title-left txt-cut'>{rowData.title}</div>
                            <div className='list-title-right'><img src={rowData.list_pic} alt=""/></div>
                        </div>
                        <div className='list-desc'>
                            {rowData.desc}
                        </div>
                        <div className='list-footer'>
                            <div className='list-footer-left'>
                                <span className='click'>{rowData.click_nums}</span>
                                <span className='comment'>
                                    {getCommentCount(rowData)}
                                </span>
                            </div>
                            <div className='list-footer-right'><NavLink to={{pathname:`/article/detail/${rowData.id}`}}>阅读全文→</NavLink></div>
                        </div>
                    </div>
                </div>
                </HashRouter>
            )
        };

        // if(list.results){
            return(
                <div>
                    <WingBlank>
                        <ActivityIndicator toast text="正在加载" animating={isShow} />
                    </WingBlank>
                    <SearchBar placeholder="Search" onSubmit={this.submit} />
                    <ListView
                        ref={el => this.lv = el}
                        dataSource={this.state.dataSource}
                        renderRow={row}
                        useBodyScroll={this.state.useBodyScroll}
                        style={{
                            height: this.state.height,
                        }}

                        onScroll={() => { console.log('scroll'); }}
                        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                            {this.state.isLoading ? 'Loading...' : '没有更多数据了'}
                        </div>)}
                        pullToRefresh={<PullToRefresh

                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                        />}
                        onEndReached={this.onEndReached}
                    />
                </div>
            )
       // /* }else{
       //      return null
       //  }*/

    }
}
const mapState = (state)=>({
    page:state.home.articleList,
    isShow:state.home.isShow,
    list:state.home.list

})
const mapDispatch = (dispatch) => ({
      getHomeList(){
         dispatch(actionCreators.getHome())
    },
    getHomePage(page){
          dispatch(actionCreators.getHomePage(page))
    }
})
export default connect(mapState,mapDispatch)(Home)