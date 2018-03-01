export default (state=0,action)=>{
    state = state || {count:0};
    switch (action.type){
        case 'ADD':
            return {count:state.count+1};
        case 'SUB':
            return {count:state.count-1};
        default:
            return state;
    }
}