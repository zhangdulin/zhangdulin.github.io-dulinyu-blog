(self.webpackChunkblog=self.webpackChunkblog||[]).push([[8949],{4522:(n,s,a)=>{"use strict";a.r(s),a.d(s,{data:()=>p});const p={key:"v-2835ec58",path:"/arithmetic/recursion/%E7%9F%A9%E5%BD%A2%E8%A6%86%E7%9B%96.html",title:"",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:3,title:"题目",slug:"题目",children:[]}],filePathRelative:"arithmetic/recursion/矩形覆盖.md",git:{updatedTime:1639623583e3,contributors:[{name:"zhangyu2207",email:"zhangyu2207@yundasys.com",commits:2}]}}},5323:(n,s,a)=>{"use strict";a.r(s),a.d(s,{default:()=>e});const p=(0,a(6252).uE)('<h3 id="题目" tabindex="-1"><a class="header-anchor" href="#题目" aria-hidden="true">#</a> 题目</h3><p>我们可以用 2<em>1 的小矩形横着或者竖着去覆盖更大的矩形。请问用 n 个 2</em>1 的小矩形无重叠地覆盖一个 2*n 的大矩形，总共有多少种方法？</p><p>假设有 8 个块</p><p>第 1 块竖着放，后面还剩 7 块，共 f(7)种方法。</p><p>第 1 块横着放，后面还剩 6 块，共 f(6)种方法。</p><p>即 f(8)=f(6)+f(7)</p><p>f(n)=f(n-1)+f(n-2)</p><p>foo</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">rectCover</span><span class="token punctuation">(</span><span class="token parameter">n</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\t<span class="token keyword">if</span> <span class="token punctuation">(</span>n <span class="token operator">&lt;=</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\t\t<span class="token keyword">return</span> n<span class="token punctuation">;</span>\n\t<span class="token punctuation">}</span>\n\t<span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>\n\t<span class="token keyword">let</span> pre <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>\n\t<span class="token keyword">let</span> current <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>\n\t<span class="token keyword">let</span> result <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>\n\t<span class="token keyword">while</span> <span class="token punctuation">(</span>i<span class="token operator">++</span> <span class="token operator">&lt;</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\t\tresult <span class="token operator">=</span> pre <span class="token operator">+</span> current<span class="token punctuation">;</span>\n\t\tpre <span class="token operator">=</span> current<span class="token punctuation">;</span>\n\t\tcurrent <span class="token operator">=</span> result<span class="token punctuation">;</span>\n\t<span class="token punctuation">}</span>\n\t<span class="token keyword">return</span> result<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div>',9),e={render:function(n,s){return p}}}}]);