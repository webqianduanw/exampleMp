<template>
  <div class="example">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="refreshImg" slot="loading"><img src="@/assets/img/example/refresh.gif"/></div>
      <div class="refreshImg" slot="loosing"><img src="@/assets/img/example/refresh.png"/></div>
      <div class="refreshImg" slot="pulling"><img src="@/assets/img/example/refresh.png"/></div>
      <div class="content">
        我是主题内容
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
// import moduleName from 'module'
import { PullRefresh } from 'vant';

export default {
    name: '',
    components: {
        VanPullRefresh: PullRefresh
    },
    data() {
        return {
            isLoading: false
        };
    },
    methods: {
        onRefresh() {
            window.location.reload();
        }
    },
    created() {

    },
    mounted() {

    },
    updated() {

    }
};
</script>

<style lang="scss">
.example{
  height: 100%;
}
</style>
