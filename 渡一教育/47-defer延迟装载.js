

// mixin
export default function(maxFrameCount) {
    return{
        data() {
            return{
                frameCount: 0
            }
        },

        mounted() {
            const refreshFrameCount = () => {
                requestAnimationFrame(() =>{
                    this.frameCount++
                    if(this.frameCount < maxFrameCount) {
                        refreshFrameCount()
                    }
                })
            }
            refreshFrameCount()
        },

        methods:{
            defer(showInFrameCount) {
                return this.frameCount >= showInFrameCount
            }
        }
    }
}

// 组件中使用
import defer from "引入上面的mixin块"
export default{
    mixins: [defer(21)]
}

// 在标签中
//   <div v-for="item in 21">
//       <Child v-if="defer(item)"></Child>
//   </div>
