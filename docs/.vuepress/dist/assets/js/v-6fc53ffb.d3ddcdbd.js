(self.webpackChunkblog=self.webpackChunkblog||[]).push([[354],{2292:(n,s,a)=>{"use strict";a.r(s),a.d(s,{data:()=>p});const p={key:"v-6fc53ffb",path:"/javaScript/es6/Iterator.html",title:"",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:2,title:"ES6 迭代器：Iterator, Iterable 和 Generator",slug:"es6-迭代器-iterator-iterable-和-generator",children:[]}],filePathRelative:"javaScript/es6/Iterator.md",git:{updatedTime:1639623583e3,contributors:[{name:"zhangyu2207",email:"zhangyu2207@yundasys.com",commits:1}]}}},5386:(n,s,a)=>{"use strict";a.r(s),a.d(s,{default:()=>e});var p=a(6252);const t=(0,p.uE)('<h2 id="es6-迭代器-iterator-iterable-和-generator" tabindex="-1"><a class="header-anchor" href="#es6-迭代器-iterator-iterable-和-generator" aria-hidden="true">#</a> ES6 迭代器：Iterator, Iterable 和 Generator</h2><p>对集合中每个元素进行处理是很常见的操作，比如数组遍历、对象的属性遍历。 以往这些操作是通过 for 循环、.forEach、.map 等方式进行， 在 ES6 中直接把迭代放在语言层面进行支持，同时提供定制 for...of 的机制。 借由迭代器机制为 Map、Array、String 等对象提供了统一的遍历语法，以及更方便的相互转换。 为方便编写迭代器还提供了生成器（Generator）语法。</p><p>本文展开介绍了这些相关概念：Iterables（可迭代对象）、Iterator（迭代器）、 Generator（生成器）和 Generator Function（生成器函数）， 以及相关机制：Iterable Protocol、Iterator Protocol、Symbol.iterator。</p><p>Iterables 和 Iterators 实现了 Iterable Protocol 的对象称为 可迭代对象（Iterables），这种对象可以用 for...of 来遍历。 Map, Set, Array, String 都属于可迭代对象。 自定义的对象也可以使用这一机制，成为可迭代对象。</p><p>Iterable Protocol：需要实现一个 ECMA @@iterator 方法，即在键 [Symbol.iterator] 上提供一个方法。对象被 for...of 调用时，这个方法会被调用。方法应该返回一个迭代器对象（Iterator）用来迭代。</p><p>实现了 Iterator Protocol 的对象称为 迭代器对象（Iterator），也就是我们说的迭代器对象。</p><p>Iterator Protocol：又称 Iteration Protocol，需要实现一个 next() 方法，每次调用会返回一个包含 value（当前指向的值）和 done（是否已经迭代完成）的对象。</p><p>标准 Iterables 举例：Array Array 可以用 for...of 来遍历，是一个可迭代对象。 我们来观察它是如何实现上述 Protocol 的。首先拿到它的 Symbol.iterator 属性（Iterable Protocol）</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">let</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;Alice&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Bob&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Carol&quot;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n<span class="token keyword">let</span> iterator <span class="token operator">=</span> arr<span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// 然后调用它的 .next() 方法（Iterator Protocol）得到，直到 done === true：</span>\n\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// { value: &#39;Alice&#39;, done: false }</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// { value: &#39;Bob&#39;, done: false }</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// { value: &#39;Carol&#39;, done: false }</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// { value: undefined, done: true }</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>自定义 Iterables 除了 Array、Map 等标准的全局对象外，我们的自定义对象也可以通过提供一个 Symbol.iterator 成为 Iteratable。 比如实现一个 50 以内的 斐波那契数列：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>\n\t<span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\t\t<span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span>\n\t\t\tb <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>\n\t\t<span class="token keyword">return</span> <span class="token punctuation">{</span>\n\t\t\t<span class="token function-variable function">next</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\t\t\t\t<span class="token keyword">let</span> value <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>\n\t\t\t\t<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>a<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\t\t\t\t\tvalue <span class="token operator">=</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>\n\t\t\t\t<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>b<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\t\t\t\t\tvalue <span class="token operator">=</span> b <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>\n\t\t\t\t<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>b <span class="token operator">&lt;</span> <span class="token number">50</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\t\t\t\t\tvalue <span class="token operator">=</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>\n\t\t\t\t\ta <span class="token operator">=</span> b<span class="token punctuation">;</span>\n\t\t\t\t\tb <span class="token operator">=</span> value<span class="token punctuation">;</span>\n\t\t\t\t<span class="token punctuation">}</span>\n\t\t\t\t<span class="token keyword">return</span> <span class="token punctuation">{</span> done<span class="token operator">:</span> value <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">,</span> value <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\t\t\t<span class="token punctuation">}</span><span class="token punctuation">,</span>\n\t\t<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\t<span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token keyword">of</span> obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\tconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1 1 2 3 5 8 13 21 34 55</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>利用 Generator 上述迭代器中我们维护了 a 和 b 两个状态，以及每次调用进入的条件分支。 ES6 提供了 Generator Function（生成器方法）来方便上述迭代器的实现。 生成器方法返回的 Generator 对象 直接就是一个实现了 Iterator Protocol 的对象。</p><p>下面使用生成器方法重新实现 50 以内的斐波那契数列：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>\n\t<span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token operator">*</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\t\t<span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span>\n\t\t\tb <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>\n\t\t<span class="token keyword">yield</span> a<span class="token punctuation">;</span>\n\t\t<span class="token keyword">yield</span> b<span class="token punctuation">;</span>\n\t\t<span class="token keyword">while</span> <span class="token punctuation">(</span>b <span class="token operator">&lt;</span> <span class="token number">50</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\t\t\t<span class="token keyword">yield</span> <span class="token punctuation">(</span>b <span class="token operator">=</span> a <span class="token operator">+</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\t\t\ta <span class="token operator">=</span> b <span class="token operator">-</span> a<span class="token punctuation">;</span>\n\t\t<span class="token punctuation">}</span>\n\t<span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token keyword">of</span> obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\tconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1 1 2 3 5 8 13 21 34 55</span>\n<span class="token punctuation">}</span>\n<span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token punctuation">[</span>Sy<span class="token punctuation">]</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>Map, Set, String, Array 互相转换 Iteration Protocol 给出了统一的迭代协议，使得不同类型的集合间转换更加方便，也方便了编写适用于不同类型集合的算法。 这一概念类似 Lodash 中的 Collection， 或者 STL 中的迭代器。以下是一些很方便的转换技巧：</p><p>从 Array 生成 Set，可用于数组去重：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;Alice&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Bob&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Carol&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// {&#39;Alice&#39;, &#39;Bob&#39;, &#39;Carol&#39;}</span>\n<span class="token comment">// 等价于</span>\n<span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;Alice&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Bob&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Carol&#39;</span><span class="token punctuation">]</span><span class="token punctuation">[</span>symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n从 Set 得到 Array：\n\n<span class="token keyword">let</span> set <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;Alice&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Bob&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Carol&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>\nArray<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span>set<span class="token punctuation">)</span> <span class="token comment">// &#39;Alice&#39;, &#39;Bob&#39;, &#39;Carol&#39;</span>\n<span class="token comment">// 等价于</span>\nArray<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token keyword">set</span><span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n除了 <span class="token keyword">for</span><span class="token operator">...</span><span class="token keyword">of</span> 外，展开语法（Spread Syntax）<span class="token operator">...</span> 也支持迭代器（Iterables）。借此可以简写作：\n\n<span class="token keyword">let</span> set <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;Alice&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Bob&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Carol&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>\n<span class="token keyword">let</span> names <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span>set<span class="token punctuation">]</span> <span class="token comment">// &#39;Alice&#39;, &#39;Bob&#39;, &#39;Carol&#39;</span>\n从 String 到 Set，得到字符串中包含的字符：\n\n<span class="token keyword">let</span> alphabet <span class="token operator">=</span> <span class="token string">&#39;abcdefghijklmnopqrstuvwxyz&#39;</span><span class="token punctuation">;</span>\n<span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span>alphabet<span class="token punctuation">)</span> <span class="token comment">// {&#39;a&#39;, &#39;b&#39;, &#39;c&#39;, ...}</span>\n<span class="token comment">// 等价于</span>\n<span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token string">&#39;alice bob&#39;</span><span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n从 Object 到 Map，也就是把传统的 JavaScript 映射转换为 Map：\n\n<span class="token keyword">let</span> mapping <span class="token operator">=</span> <span class="token punctuation">{</span>\n<span class="token string">&quot;foo&quot;</span><span class="token operator">:</span> <span class="token string">&quot;bar&quot;</span>\n<span class="token punctuation">}</span>\n<span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span>Object<span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span>mapping<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// {&quot;foo&quot; =&gt; &quot;bar&quot;}</span>\n类似地，Object 的键的集合可以这样获取：\n\n<span class="token keyword">let</span> mapping <span class="token operator">=</span> <span class="token punctuation">{</span>\n<span class="token string">&quot;foo&quot;</span><span class="token operator">:</span> <span class="token string">&quot;bar&quot;</span>\n<span class="token punctuation">}</span>\n<span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span>Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>mapping<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// {&quot;foo&quot;}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div>',17),e={render:function(n,s){const a=(0,p.up)("Gitalk");return(0,p.wg)(),(0,p.j4)(p.HY,null,[t,(0,p.Wm)(a)],64)}}}}]);