export const state = () => ({
 // SP判定フラグ
 isSp: false
})

export const mutations = {
 setIsSp(state){
  state.isSp = true
 },
 setIsPc(state){
  state.isSp = false
 }
}