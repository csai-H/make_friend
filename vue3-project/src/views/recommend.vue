<script setup>
import { ref } from 'vue'
import Banner from './banner.vue'

</script>

<template>
    <div class="recommend">
        <div class="recommend-news">
            <div class="container">
                <div class="message">
                    <div class="title clearfix">
                        <span class="leftfix">推荐</span>
                        <a href="#" class="rightfix">更多&nbsp;&gt;</a>
                    </div>
                    <ul class="msg-list">
                        <div class="back">
                            <img src='../../../images/R.jpg' alt="" width="260px" height="300px">
                        </div>
                        <li><a href="#">探索世界，发现美好。一路风景，一路欢歌。旅行，让生活充满惊喜。携手伙伴，
                            共度浪漫时光。陪伴自己成长，共同创造美好回忆。走遍千山万水，只为寻找心中的美景。</a></li>

                    </ul>
                </div>
            </div>
        </div>
        <div class="recommend-right">
            <Banner />
        </div>
        <div class="slide-other leftfix">
            <div class="message">
                <div class="title clearfix">
                    <span class="leftfix">友搭快报</span>
                    <a href="#" class="rightfix">更多&nbsp;&gt;</a>
                </div>
                <ul class="msg-list">
                    <li><a href="#">[牵线] xxx与xxx成功互搭！</a></li>
                    <li><a href="#">[牵线] xxx与xxx成功互搭！</a></li>
                    <li><a href="#">[牵线] xxx与xxx成功互搭！</a></li>
                    <li><a href="#">[牵线] xxx与xxx成功互搭！</a></li>
                    <li><a href="#">[牵线] xxx与xxx成功互搭！</a></li>
                    <li><a href="#">[牵线] xxx与xxx成功互搭！</a></li>
                    <li><a href="#">[牵线] xxx与xxx成功互搭！</a></li>
                    <li><a href="#">[牵线] xxx与xxx成功互搭！</a></li>
                    <li><a href="#">[牵线] xxx与xxx成功互搭！</a></li>
                    <li><a href="#">[牵线] xxx与xxx成功互搭！</a></li>

                </ul>
            </div>
        </div>
    </div>

</template>

<style scoped></style>
