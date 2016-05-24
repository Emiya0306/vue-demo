export default `

    <h1>Hello App!</h1>
    <p>
        <!-- use v-link directive for navigation. -->
        <a v-link="/foo">Go to Foo</a>
        <a v-link="/bar">Go to Bar</a>
    </p>
    <router-view class="view" transition="test" transition-mode="out-in" keep-alive></router-view>


`