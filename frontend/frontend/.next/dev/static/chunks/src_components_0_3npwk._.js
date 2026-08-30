(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/BeyondPrototype.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BeyondPrototype
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/ScrollTrigger.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
if ("TURBOPACK compile-time truthy", 1) {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"]);
}
const applications = [
    {
        id: 1,
        title: "Urban Water\nDetection",
        desc1: "Municipal water distribution networks span hundreds of kilometers, making continuous monitoring both expensive and operationally challenging. Undetected leaks contribute to significant water loss, increased maintenance costs, and reduced service reliability.",
        desc2: "LeakSense optimizes sensor placement using physics-informed models, allowing utilities to monitor larger portions of the network with fewer sensors. This enables faster leak localization, reduced inspection efforts, and more efficient infrastructure management.",
        images: [
            "/images/BeyondPrototype11.webp",
            "/images/BeyondPrototype12.webp",
            "/images/BeyondPrototype13.webp"
        ]
    },
    {
        id: 2,
        title: "Oil & Gas\nPipelines",
        desc1: "Oil and gas transmission pipelines often pass through remote and environmentally sensitive regions where routine inspections are difficult. Even small leaks can lead to substantial economic losses and environmental damage.",
        desc2: "By combining optimized sensor placement with physics-informed leak localization, LeakSense provides early detection and accurate identification of potential leak locations, helping operators improve safety while minimizing operational costs.",
        images: [
            "/images/BeyondPrototype21.webp",
            "/images/BeyondPrototype22.webp",
            "/images/BeyondPrototype23.webp"
        ]
    },
    {
        id: 3,
        title: "Smart Irrigation\nNetworks",
        desc1: "Modern irrigation systems distribute water across vast agricultural landscapes, where hidden leaks can waste valuable resources and negatively impact crop productivity. Traditional monitoring methods often require extensive sensor deployment.",
        desc2: "LeakSense enables efficient monitoring with strategically optimized sensor locations, reducing deployment costs while maintaining accurate leak detection. This helps improve water conservation, operational efficiency, and sustainable agricultural practices.",
        images: [
            "/images/BeyondPrototype31.webp",
            "/images/BeyondPrototype32.webp",
            "/images/BeyondPrototype33.webp"
        ]
    }
];
function SlideImageGallery({ images, altText }) {
    _s();
    const [hoverIndex, setHoverIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    return(// Added shrink-0 and ml-auto to force it to stay full width and locked to the right edge
    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-[45%] shrink-0 h-full overflow-hidden rounded-sm relative ml-auto",
        children: [
            images.map((img, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: img,
                    alt: `${altText} - View ${idx + 1}`,
                    className: `absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out ${hoverIndex === idx ? 'opacity-80 z-0' : 'opacity-0 -z-10'}`
                }, idx, false, {
                    fileName: "[project]/src/components/BeyondPrototype.tsx",
                    lineNumber: 55,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 w-full h-full flex z-10",
                children: images.map((_, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 h-full cursor-pointer",
                        onMouseEnter: ()=>setHoverIndex(idx)
                    }, idx, false, {
                        fileName: "[project]/src/components/BeyondPrototype.tsx",
                        lineNumber: 67,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/BeyondPrototype.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/BeyondPrototype.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this));
}
_s(SlideImageGallery, "IJblULCFlHr4+MiZCisCSROCVKU=");
_c = SlideImageGallery;
function BeyondPrototype() {
    _s1();
    const [active, setActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const sectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const stripRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "BeyondPrototype.useLayoutEffect": ()=>{
            const section = sectionRef.current;
            const strip = stripRef.current;
            if (!section || !strip) return;
            const ctx = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].context({
                "BeyondPrototype.useLayoutEffect.ctx": ()=>{
                    const scrollWidth = strip.scrollWidth - window.innerWidth;
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(strip, {
                        x: -scrollWidth,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top top',
                            end: `+=${scrollWidth}`,
                            pin: true,
                            scrub: 1,
                            invalidateOnRefresh: true,
                            onUpdate: {
                                "BeyondPrototype.useLayoutEffect.ctx": (self)=>{
                                    const newActive = Math.round(self.progress * (applications.length - 1));
                                    setActive(newActive);
                                }
                            }["BeyondPrototype.useLayoutEffect.ctx"]
                        }
                    });
                }
            }["BeyondPrototype.useLayoutEffect.ctx"], sectionRef);
            return ({
                "BeyondPrototype.useLayoutEffect": ()=>ctx.revert()
            })["BeyondPrototype.useLayoutEffect"];
        }
    }["BeyondPrototype.useLayoutEffect"], []);
    const handleThumbnailClick = (index)=>{
        if (!stripRef.current) return;
        setActive(index);
        const scrollWidth = stripRef.current.scrollWidth - window.innerWidth;
        const targetX = index / (applications.length - 1) * scrollWidth;
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(stripRef.current, {
            x: -targetX,
            duration: 1,
            ease: 'power3.inOut'
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: sectionRef,
        className: "relative w-full h-screen bg-black overflow-hidden font-montserrat z-30",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: stripRef,
                className: "flex h-screen w-[300vw] will-change-transform",
                children: applications.map((app)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-screen h-screen flex-shrink-0 flex flex-col justify-start px-16 lg:px-25 pt-[18vh]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full flex justify-between items-start mb-12 h-[35vh]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-[50%] shrink-0 flex flex-col",
                                        children: app.id === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "text-white text-4xl lg:text-6xl font-[500] leading-none flex flex-col w-full",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-pixel font-normal tracking-normal ml-[35%] lg:ml-[50%] -mb-4 z-10",
                                                    children: "Where"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/BeyondPrototype.tsx",
                                                    lineNumber: 144,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "whitespace-nowrap",
                                                    children: "LeakSense Works"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/BeyondPrototype.tsx",
                                                    lineNumber: 147,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/BeyondPrototype.tsx",
                                            lineNumber: 143,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/BeyondPrototype.tsx",
                                        lineNumber: 141,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SlideImageGallery, {
                                        images: app.images,
                                        altText: app.title
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/BeyondPrototype.tsx",
                                        lineNumber: 152,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/BeyondPrototype.tsx",
                                lineNumber: 138,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-row justify-start items-start gap-8 lg:gap-12 w-full pt-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-auto lg:w-[328px] shrink-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-[#F02B11] text-3xl lg:text-4xl font-[600] whitespace-pre-line leading-[1.1]",
                                            children: app.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/BeyondPrototype.tsx",
                                            lineNumber: 160,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/BeyondPrototype.tsx",
                                        lineNumber: 159,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 flex flex-row gap-12 lg:gap-16",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-300 text-sm lg:text-[15px] leading-tight flex-1 font-[400]",
                                                children: app.desc1
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/BeyondPrototype.tsx",
                                                lineNumber: 166,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-300 text-sm lg:text-[15px] leading-tight flex-1 font-[400]",
                                                children: app.desc2
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/BeyondPrototype.tsx",
                                                lineNumber: 169,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/BeyondPrototype.tsx",
                                        lineNumber: 165,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/BeyondPrototype.tsx",
                                lineNumber: 157,
                                columnNumber: 13
                            }, this)
                        ]
                    }, app.id, true, {
                        fileName: "[project]/src/components/BeyondPrototype.tsx",
                        lineNumber: 133,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/BeyondPrototype.tsx",
                lineNumber: 131,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-12 right-16 lg:right-25 z-40 flex gap-4 bg-black/50 p-2 rounded-sm backdrop-blur-sm",
                children: applications.map((app, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: ()=>handleThumbnailClick(index),
                        className: `w-[80px] h-[50px] cursor-pointer transition-all duration-300 overflow-hidden ${active === index ? 'opacity-100 border-2 border-white' : 'opacity-40 hover:opacity-70'}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: app.images[0],
                            alt: `Go to ${app.title}`,
                            className: "w-full h-full object-cover"
                        }, void 0, false, {
                            fileName: "[project]/src/components/BeyondPrototype.tsx",
                            lineNumber: 191,
                            columnNumber: 13
                        }, this)
                    }, app.id, false, {
                        fileName: "[project]/src/components/BeyondPrototype.tsx",
                        lineNumber: 182,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/BeyondPrototype.tsx",
                lineNumber: 180,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/BeyondPrototype.tsx",
        lineNumber: 128,
        columnNumber: 5
    }, this);
}
_s1(BeyondPrototype, "HHeenkDVJ1FljTOuLWDBQJjljkM=");
_c1 = BeyondPrototype;
var _c, _c1;
__turbopack_context__.k.register(_c, "SlideImageGallery");
__turbopack_context__.k.register(_c1, "BeyondPrototype");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Footer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function Footer() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "relative w-full h-[40vh] min-h-[350px] flex flex-col py-10 font-montserrat overflow-hidden z-30",
        style: {
            // Radial gradient anchored at the bottom center: lighter red spreading into a dark maroon
            background: 'radial-gradient(ellipse at bottom center, #1664bf 0%, #1518db 100%)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                dangerouslySetInnerHTML: {
                    __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-infinite {
          animation: marquee 15s linear infinite;
        }
      `
                }
            }, void 0, false, {
                fileName: "[project]/src/components/Footer.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-12 right-16 lg:right-25 flex flex-col items-start gap-1 z-20 text-white font-[700] text-lg lg:text-xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "#",
                        className: "hover:opacity-70 transition-opacity",
                        children: "Home"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Footer.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "https://github.com",
                        target: "_blank",
                        rel: "noreferrer",
                        className: "hover:opacity-70 transition-opacity",
                        children: "Github"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Footer.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Footer.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-auto mb-8 w-full flex items-center relative z-10 pointer-events-none",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex w-max animate-marquee-infinite",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex whitespace-nowrap items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white text-6xl lg:text-8xl font-[700] tracking-tight px-6",
                                    children: "LeakSense"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Footer.tsx",
                                    lineNumber: 36,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white text-4xl lg:text-6xl px-2 mb-1 lg:mb-2",
                                    children: "•"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Footer.tsx",
                                    lineNumber: 37,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white text-6xl lg:text-8xl font-[700] tracking-tight px-6",
                                    children: "LeakSense"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Footer.tsx",
                                    lineNumber: 38,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white text-4xl lg:text-6xl px-2 mb-1 lg:mb-2",
                                    children: "•"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Footer.tsx",
                                    lineNumber: 39,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white text-6xl lg:text-8xl font-[700] tracking-tight px-6",
                                    children: "LeakSense"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Footer.tsx",
                                    lineNumber: 40,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white text-4xl lg:text-6xl px-2 mb-1 lg:mb-2",
                                    children: "•"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Footer.tsx",
                                    lineNumber: 41,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Footer.tsx",
                            lineNumber: 35,
                            columnNumber: 12
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex whitespace-nowrap items-center",
                            "aria-hidden": "true",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white text-6xl lg:text-8xl font-[700] tracking-tight px-6",
                                    children: "LeakSense"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Footer.tsx",
                                    lineNumber: 46,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white text-4xl lg:text-6xl px-2 mb-1 lg:mb-2",
                                    children: "•"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Footer.tsx",
                                    lineNumber: 47,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white text-6xl lg:text-8xl font-[700] tracking-tight px-6",
                                    children: "LeakSense"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Footer.tsx",
                                    lineNumber: 48,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white text-4xl lg:text-6xl px-2 mb-1 lg:mb-2",
                                    children: "•"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Footer.tsx",
                                    lineNumber: 49,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white text-6xl lg:text-8xl font-[700] tracking-tight px-6",
                                    children: "LeakSense"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Footer.tsx",
                                    lineNumber: 50,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white text-4xl lg:text-6xl px-2 mb-1 lg:mb-2",
                                    children: "•"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Footer.tsx",
                                    lineNumber: 51,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Footer.tsx",
                            lineNumber: 45,
                            columnNumber: 12
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Footer.tsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/Footer.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full flex justify-center z-20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-white font-[700] text-base lg:text-lg tracking-wide",
                    children: "Made by Deez Nulls"
                }, void 0, false, {
                    fileName: "[project]/src/components/Footer.tsx",
                    lineNumber: 59,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/Footer.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Footer.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
_c = Footer;
var _c;
__turbopack_context__.k.register(_c, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Hero.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Hero
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/ScrollTrigger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
if ("TURBOPACK compile-time truthy", 1) {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"]);
}
function Hero() {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [currentFrame, setCurrentFrame] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "Hero.useLayoutEffect": ()=>{
            const canvas = canvasRef.current;
            const context = canvas?.getContext('2d');
            if (!canvas || !context || !containerRef.current) return;
            canvas.width = 1920;
            canvas.height = 1080;
            const frameCount = 240;
            const getFramePath = {
                "Hero.useLayoutEffect.getFramePath": (index)=>`/images/frames/ezgif-frame-${String(index + 1).padStart(3, '0')}.jpg`
            }["Hero.useLayoutEffect.getFramePath"];
            const images = [];
            const frameObj = {
                frame: 0
            };
            // 1. Preload all frames
            for(let i = 0; i < frameCount; i++){
                const img = new window.Image();
                img.src = getFramePath(i);
                images.push(img);
            }
            // 2. Draw first frame on load
            images[0].onload = ({
                "Hero.useLayoutEffect": ()=>{
                    context.drawImage(images[0], 0, 0, canvas.width, canvas.height);
                }
            })["Hero.useLayoutEffect"];
            // 3. Render function
            const render = {
                "Hero.useLayoutEffect.render": ()=>{
                    if (images[frameObj.frame]) {
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        context.drawImage(images[frameObj.frame], 0, 0, canvas.width, canvas.height);
                        setCurrentFrame(Math.round(frameObj.frame));
                    }
                }
            }["Hero.useLayoutEffect.render"];
            // 4. Wrap GSAP logic in gsap.context()
            const ctx = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].context({
                "Hero.useLayoutEffect.ctx": ()=>{
                    const tl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].timeline({
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top top",
                            end: "+=400%",
                            scrub: 0.5,
                            pin: true
                        }
                    });
                    tl.to(frameObj, {
                        frame: frameCount - 1,
                        snap: "frame",
                        ease: "none",
                        onUpdate: render
                    });
                }
            }["Hero.useLayoutEffect.ctx"], containerRef); // <- Scoped to the Hero container!
            // Safely revert ONLY this component's animations on unmount
            return ({
                "Hero.useLayoutEffect": ()=>{
                    ctx.revert();
                }
            })["Hero.useLayoutEffect"];
        }
    }["Hero.useLayoutEffect"], []);
    // Helper function to calculate opacity based on the current frame.
    const getOpacity = (startFrame, endFrame)=>{
        if (currentFrame < startFrame || currentFrame > endFrame) return 0;
        const fadeDuration = 15;
        // Fade in
        if (currentFrame < startFrame + fadeDuration) {
            return (currentFrame - startFrame) / fadeDuration;
        }
        // Fade out
        if (currentFrame > endFrame - fadeDuration) {
            return (endFrame - currentFrame) / fadeDuration;
        }
        // Solid hold
        return 1;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: containerRef,
        className: "relative w-full h-screen bg-[#000] overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                ref: canvasRef,
                className: "absolute inset-0 w-full h-full object-cover"
            }, void 0, false, {
                fileName: "[project]/src/components/Hero.tsx",
                lineNumber: 102,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-10 pointer-events-none"
            }, void 0, false, {
                fileName: "[project]/src/components/Hero.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none transition-opacity duration-75",
                style: {
                    opacity: getOpacity(0, 60)
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative w-full max-w-[1200px] h-[250px] flex items-center justify-center -mt-20",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute left-8 lg:left-12 top-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-300 text-xl lg:text-2xl font-montserrat leading-snug",
                                children: [
                                    "Intelligent Monitoring for",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/src/components/Hero.tsx",
                                        lineNumber: 120,
                                        columnNumber: 41
                                    }, this),
                                    "Water Networks."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Hero.tsx",
                                lineNumber: 119,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/Hero.tsx",
                            lineNumber: 118,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/images/group 4.webp",
                                    alt: "LS Logo",
                                    width: 220,
                                    height: 100,
                                    className: "object-contain"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Hero.tsx",
                                    lineNumber: 126,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-white text-5xl lg:text-7xl font-[700] tracking-tight",
                                    children: "LeakSense"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Hero.tsx",
                                    lineNumber: 133,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Hero.tsx",
                            lineNumber: 125,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute right-8 lg:right-12 bottom-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-300 text-xl lg:text-2xl font-montserrat leading-snug",
                                children: [
                                    "Engineering Intelligence",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/src/components/Hero.tsx",
                                        lineNumber: 141,
                                        columnNumber: 39
                                    }, this),
                                    "Beneath the Surface."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Hero.tsx",
                                lineNumber: 140,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/Hero.tsx",
                            lineNumber: 139,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Hero.tsx",
                    lineNumber: 115,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/Hero.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none transition-opacity duration-75",
                style: {
                    opacity: getOpacity(60, 120)
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-white text-5xl font-[700] mb-24 -mt-10",
                        children: "It begins with observation."
                    }, void 0, false, {
                        fileName: "[project]/src/components/Hero.tsx",
                        lineNumber: 153,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex w-full px-40 justify-between items-start",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-white text-2xl font-montserrat max-w-sm text-center leading-relaxed",
                                children: "LeakSense analyzes the structure of a water distribution network to determine where measurements matter most."
                            }, void 0, false, {
                                fileName: "[project]/src/components/Hero.tsx",
                                lineNumber: 157,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-white text-2xl font-montserrat text-center leading-relaxed",
                                children: [
                                    'No "cost."',
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/src/components/Hero.tsx",
                                        lineNumber: 161,
                                        columnNumber: 23
                                    }, this),
                                    'No "coverage."',
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/src/components/Hero.tsx",
                                        lineNumber: 161,
                                        columnNumber: 42
                                    }, this),
                                    'No "hidden leaks."'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Hero.tsx",
                                lineNumber: 160,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Hero.tsx",
                        lineNumber: 156,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Hero.tsx",
                lineNumber: 149,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none transition-opacity duration-75",
                style: {
                    opacity: getOpacity(120, 180)
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex w-full px-32 justify-between items-start",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-white text-2xl font-montserrat max-w-lg text-center leading-relaxed",
                            children: "Every measurement carries a different amount of information. By combining network physics with optimization, LeakSense identifies the junctions where each sensor contributes the most toward understanding the system."
                        }, void 0, false, {
                            fileName: "[project]/src/components/Hero.tsx",
                            lineNumber: 172,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-white text-2xl font-montserrat max-w-lg text-center leading-relaxed",
                            children: "The optimized measurements are processed by a Physics-Informed Neural Network, enabling accurate reconstruction of the network state and prediction of probable leak locations."
                        }, void 0, false, {
                            fileName: "[project]/src/components/Hero.tsx",
                            lineNumber: 175,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Hero.tsx",
                    lineNumber: 171,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/Hero.tsx",
                lineNumber: 167,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none transition-opacity duration-75",
                style: {
                    opacity: getOpacity(180, 240)
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-white text-4xl font-montserrat max-w-4xl text-center leading-relaxed -mt-20",
                        children: "Built on physics, driven by data, LeakSense delivers accurate leak localization while reducing the need for extensive sensor deployment."
                    }, void 0, false, {
                        fileName: "[project]/src/components/Hero.tsx",
                        lineNumber: 186,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-12 flex items-center gap-2 text-gray-300 font-montserrat text-sm tracking-widest animate-pulse",
                        children: [
                            "Explore the System ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "↓"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Hero.tsx",
                                lineNumber: 192,
                                columnNumber: 30
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Hero.tsx",
                        lineNumber: 191,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Hero.tsx",
                lineNumber: 182,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Hero.tsx",
        lineNumber: 99,
        columnNumber: 5
    }, this);
}
_s(Hero, "v87Jn7qwhVLIGI6eG2RgHjPT0P4=");
_c = Hero;
var _c;
__turbopack_context__.k.register(_c, "Hero");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/LiveDemo.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EDGES",
    ()=>EDGES,
    "NODES",
    ()=>NODES,
    "NODE_BY_ID",
    ()=>NODE_BY_ID,
    "OPTIMAL_PLACEMENT_ORDER",
    ()=>OPTIMAL_PLACEMENT_ORDER,
    "default",
    ()=>LiveDemo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
const NODES = [
    {
        id: "2",
        label: "N2",
        kind: "junction",
        x: 470,
        y: 313,
        demand: 0,
        pressure: 0
    },
    {
        id: "3",
        label: "N3",
        kind: "junction",
        x: 468,
        y: 348,
        demand: 0,
        pressure: 0
    },
    {
        id: "4",
        label: "N4",
        kind: "junction",
        x: 536,
        y: 348,
        demand: 0,
        pressure: 0
    },
    {
        id: "5",
        label: "N5",
        kind: "junction",
        x: 584,
        y: 348,
        demand: 0,
        pressure: 0
    },
    {
        id: "6",
        label: "N6",
        kind: "junction",
        x: 631,
        y: 348,
        demand: 0,
        pressure: 0
    },
    {
        id: "7",
        label: "N7",
        kind: "junction",
        x: 631,
        y: 380,
        demand: 0,
        pressure: 0
    },
    {
        id: "8",
        label: "N8",
        kind: "junction",
        x: 631,
        y: 415,
        demand: 0,
        pressure: 0
    },
    {
        id: "9",
        label: "N9",
        kind: "junction",
        x: 631,
        y: 450,
        demand: 0,
        pressure: 0
    },
    {
        id: "10",
        label: "N10",
        kind: "junction",
        x: 593,
        y: 450,
        demand: 0,
        pressure: 0
    },
    {
        id: "11",
        label: "N11",
        kind: "junction",
        x: 593,
        y: 478,
        demand: 0,
        pressure: 0
    },
    {
        id: "12",
        label: "N12",
        kind: "junction",
        x: 593,
        y: 498,
        demand: 0,
        pressure: 0
    },
    {
        id: "13",
        label: "N13",
        kind: "junction",
        x: 542,
        y: 498,
        demand: 0,
        pressure: 0
    },
    {
        id: "14",
        label: "N14",
        kind: "junction",
        x: 554,
        y: 450,
        demand: 0,
        pressure: 0
    },
    {
        id: "15",
        label: "N15",
        kind: "junction",
        x: 505,
        y: 450,
        demand: 0,
        pressure: 0
    },
    {
        id: "16",
        label: "N16",
        kind: "junction",
        x: 467,
        y: 450,
        demand: 0,
        pressure: 0
    },
    {
        id: "17",
        label: "N17",
        kind: "junction",
        x: 467,
        y: 427,
        demand: 0,
        pressure: 0
    },
    {
        id: "18",
        label: "N18",
        kind: "junction",
        x: 468,
        y: 407,
        demand: 0,
        pressure: 0
    },
    {
        id: "19",
        label: "N19",
        kind: "junction",
        x: 468,
        y: 377,
        demand: 0,
        pressure: 0
    },
    {
        id: "20",
        label: "N20",
        kind: "junction",
        x: 414,
        y: 348,
        demand: 0,
        pressure: 0
    },
    {
        id: "21",
        label: "N21",
        kind: "junction",
        x: 414,
        y: 315,
        demand: 0,
        pressure: 0
    },
    {
        id: "22",
        label: "N22",
        kind: "junction",
        x: 414,
        y: 280,
        demand: 0,
        pressure: 0
    },
    {
        id: "23",
        label: "N23",
        kind: "junction",
        x: 368,
        y: 348,
        demand: 0,
        pressure: 0
    },
    {
        id: "24",
        label: "N24",
        kind: "junction",
        x: 368,
        y: 409,
        demand: 0,
        pressure: 0
    },
    {
        id: "25",
        label: "N25",
        kind: "junction",
        x: 366,
        y: 450,
        demand: 0,
        pressure: 0
    },
    {
        id: "26",
        label: "N26",
        kind: "junction",
        x: 403,
        y: 450,
        demand: 0,
        pressure: 0
    },
    {
        id: "27",
        label: "N27",
        kind: "junction",
        x: 436,
        y: 450,
        demand: 0,
        pressure: 0
    },
    {
        id: "28",
        label: "N28",
        kind: "junction",
        x: 322,
        y: 348,
        demand: 0,
        pressure: 0
    },
    {
        id: "29",
        label: "N29",
        kind: "junction",
        x: 267,
        y: 350,
        demand: 0,
        pressure: 0
    },
    {
        id: "30",
        label: "N30",
        kind: "junction",
        x: 267,
        y: 395,
        demand: 0,
        pressure: 0
    },
    {
        id: "31",
        label: "N31",
        kind: "junction",
        x: 267,
        y: 450,
        demand: 0,
        pressure: 0
    },
    {
        id: "32",
        label: "N32",
        kind: "junction",
        x: 322,
        y: 450,
        demand: 0,
        pressure: 0
    },
    {
        id: "1",
        label: "N1",
        kind: "reservoir",
        x: 470,
        y: 274,
        demand: 0,
        pressure: 0
    }
];
const EDGES = [
    {
        id: "P1",
        source: "1",
        target: "2",
        lengthM: 105,
        diameterMm: 1008,
        baseLeak: 0
    },
    {
        id: "P2",
        source: "2",
        target: "3",
        lengthM: 1295,
        diameterMm: 988,
        baseLeak: 0
    },
    {
        id: "P3",
        source: "3",
        target: "4",
        lengthM: 908,
        diameterMm: 1025,
        baseLeak: 0
    },
    {
        id: "P4",
        source: "4",
        target: "5",
        lengthM: 1114,
        diameterMm: 1031,
        baseLeak: 0
    },
    {
        id: "P5",
        source: "5",
        target: "6",
        lengthM: 1453,
        diameterMm: 1052,
        baseLeak: 0
    },
    {
        id: "P6",
        source: "6",
        target: "7",
        lengthM: 439,
        diameterMm: 1007,
        baseLeak: 0
    },
    {
        id: "P7",
        source: "7",
        target: "8",
        lengthM: 872,
        diameterMm: 1064,
        baseLeak: 0
    },
    {
        id: "P8",
        source: "8",
        target: "9",
        lengthM: 826,
        diameterMm: 1010,
        baseLeak: 0
    },
    {
        id: "P9",
        source: "9",
        target: "10",
        lengthM: 790,
        diameterMm: 993,
        baseLeak: 0
    },
    {
        id: "P10",
        source: "10",
        target: "11",
        lengthM: 908,
        diameterMm: 759,
        baseLeak: 0
    },
    {
        id: "P11",
        source: "11",
        target: "12",
        lengthM: 1193,
        diameterMm: 792,
        baseLeak: 0
    },
    {
        id: "P12",
        source: "12",
        target: "13",
        lengthM: 3531,
        diameterMm: 581,
        baseLeak: 0
    },
    {
        id: "P13",
        source: "10",
        target: "14",
        lengthM: 821,
        diameterMm: 398,
        baseLeak: 0
    },
    {
        id: "P14",
        source: "14",
        target: "15",
        lengthM: 504,
        diameterMm: 423,
        baseLeak: 0
    },
    {
        id: "P15",
        source: "15",
        target: "16",
        lengthM: 538,
        diameterMm: 296,
        baseLeak: 0
    },
    {
        id: "P16",
        source: "17",
        target: "16",
        lengthM: 2845,
        diameterMm: 407,
        baseLeak: 0
    },
    {
        id: "P17",
        source: "17",
        target: "18",
        lengthM: 1673,
        diameterMm: 516,
        baseLeak: 0
    },
    {
        id: "P18",
        source: "18",
        target: "19",
        lengthM: 784,
        diameterMm: 611,
        baseLeak: 0
    },
    {
        id: "P19",
        source: "19",
        target: "3",
        lengthM: 393,
        diameterMm: 607,
        baseLeak: 0
    },
    {
        id: "P20",
        source: "3",
        target: "20",
        lengthM: 2187,
        diameterMm: 1047,
        baseLeak: 0
    },
    {
        id: "P21",
        source: "20",
        target: "21",
        lengthM: 1519,
        diameterMm: 532,
        baseLeak: 0
    },
    {
        id: "P22",
        source: "21",
        target: "22",
        lengthM: 484,
        diameterMm: 312,
        baseLeak: 0
    },
    {
        id: "P23",
        source: "20",
        target: "23",
        lengthM: 2722,
        diameterMm: 1052,
        baseLeak: 0
    },
    {
        id: "P24",
        source: "23",
        target: "24",
        lengthM: 1198,
        diameterMm: 774,
        baseLeak: 0
    },
    {
        id: "P25",
        source: "24",
        target: "25",
        lengthM: 1255,
        diameterMm: 760,
        baseLeak: 0
    },
    {
        id: "P26",
        source: "26",
        target: "25",
        lengthM: 820,
        diameterMm: 492,
        baseLeak: 0
    },
    {
        id: "P27",
        source: "27",
        target: "26",
        lengthM: 310,
        diameterMm: 318,
        baseLeak: 0
    },
    {
        id: "P28",
        source: "16",
        target: "27",
        lengthM: 724,
        diameterMm: 313,
        baseLeak: 0
    },
    {
        id: "P29",
        source: "23",
        target: "28",
        lengthM: 1491,
        diameterMm: 422,
        baseLeak: 0
    },
    {
        id: "P30",
        source: "28",
        target: "29",
        lengthM: 2032,
        diameterMm: 412,
        baseLeak: 0
    },
    {
        id: "P31",
        source: "29",
        target: "30",
        lengthM: 1624,
        diameterMm: 295,
        baseLeak: 0
    },
    {
        id: "P32",
        source: "30",
        target: "31",
        lengthM: 156,
        diameterMm: 317,
        baseLeak: 0
    },
    {
        id: "P33",
        source: "32",
        target: "31",
        lengthM: 858,
        diameterMm: 423,
        baseLeak: 0
    },
    {
        id: "P34",
        source: "25",
        target: "32",
        lengthM: 911,
        diameterMm: 492,
        baseLeak: 0
    }
];
const NODE_BY_ID = Object.fromEntries(_c1 = NODES.map(_c = (n)=>[
        n.id,
        n
    ]));
_c2 = NODE_BY_ID;
const OPTIMAL_PLACEMENT_ORDER = [
    "13",
    "31",
    "22",
    "12",
    "30",
    "9",
    "27",
    "6",
    "17",
    "25",
    "32",
    "29",
    "15",
    "21",
    "3",
    "20",
    "28",
    "24",
    "10",
    "18",
    "14",
    "16",
    "26",
    "8",
    "4",
    "5",
    "7",
    "11",
    "19",
    "2",
    "23"
];
// Dynamically generate 31 data points for the ROI curve
const paretoData = Array.from({
    length: 31
}, (_, i)=>{
    const sensors = i + 1;
    let accuracy;
    if (sensors === 1) accuracy = 42;
    else if (sensors === 2) accuracy = 68;
    else if (sensors === 3) accuracy = 81;
    else if (sensors === 4) accuracy = 89;
    else if (sensors === 5) accuracy = 91;
    else if (sensors === 12) accuracy = 96;
    else accuracy = Math.min(99, Math.round(91 + 8 * (1 - Math.exp(-0.15 * (sensors - 5)))));
    const x = 5 + (sensors - 1) * (95 / 30);
    const y = 85 - (accuracy - 42) / (99 - 42) * 75;
    return {
        sensors,
        accuracy,
        x,
        y
    };
});
const pathD = `M ${paretoData.map((p)=>`${p.x} ${p.y}`).join(' L ')}`;
// Map Client mouse coordinates perfectly to SVG viewBox coordinates
const SVG_VIEWBOX = {
    x: 240,
    y: 250,
    w: 420,
    h: 280
};
function LiveDemo() {
    _s();
    const [sensors, setSensors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('12');
    const [sensorTokens, setSensorTokens] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isOptimized, setIsOptimized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // Custom Drag State
    const [dragState, setDragState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const numSensors = parseInt(sensors, 10);
    const currentData = paretoData.find((d)=>d.sensors.toString() === sensors) || paretoData[11];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LiveDemo.useEffect": ()=>{
            const initialTargetNodes = OPTIMAL_PLACEMENT_ORDER.slice(0, numSensors);
            const newTokens = initialTargetNodes.map({
                "LiveDemo.useEffect.newTokens": (nodeId, idx)=>({
                        sensorIndex: idx,
                        nodeId
                    })
            }["LiveDemo.useEffect.newTokens"]);
            setSensorTokens(newTokens);
            setIsOptimized(true);
        }
    }["LiveDemo.useEffect"], [
        numSensors
    ]);
    const handleRunAnalysis = ()=>{
        const optimalNodes = OPTIMAL_PLACEMENT_ORDER.slice(0, numSensors);
        setSensorTokens((prev)=>prev.map((token, idx)=>({
                    ...token,
                    nodeId: optimalNodes[idx] || token.nodeId
                })));
        setIsOptimized(true);
    };
    // --- CUSTOM SVG DRAG LOGIC ---
    const handlePointerDown = (e, tokenIndex, startX, startY)=>{
        e.stopPropagation();
        e.currentTarget.setPointerCapture(e.pointerId);
        setDragState({
            tokenIndex,
            x: startX,
            y: startY
        });
    };
    const handlePointerMove = (e)=>{
        if (!dragState) return;
        // Convert mouse pixels to SVG viewBox coordinates
        const svgElement = e.currentTarget;
        const rect = svgElement.getBoundingClientRect();
        const scaleX = SVG_VIEWBOX.w / rect.width;
        const scaleY = SVG_VIEWBOX.h / rect.height;
        const clientX = e.clientX - rect.left;
        const clientY = e.clientY - rect.top;
        const svgX = SVG_VIEWBOX.x + clientX * scaleX;
        const svgY = SVG_VIEWBOX.y + clientY * scaleY;
        setDragState({
            ...dragState,
            x: svgX,
            y: svgY
        });
    };
    const handlePointerUp = (e)=>{
        if (!dragState) return;
        // Find the closest valid node to snap to
        let closestNode = null;
        let minDistance = 20; // Maximum snapping radius in SVG units
        for (const node of NODES){
            if (node.kind === 'reservoir') continue; // Note: 'continue' instead of 'return' here
            const dist = Math.sqrt(Math.pow(node.x - dragState.x, 2) + Math.pow(node.y - dragState.y, 2));
            if (dist < minDistance) {
                minDistance = dist;
                closestNode = node;
            }
        }
        if (closestNode) {
            const targetNodeId = closestNode.id;
            const existingTokenOnTarget = sensorTokens.find((t)=>t.nodeId === targetNodeId);
            setSensorTokens((prev)=>{
                return prev.map((token)=>{
                    if (token.sensorIndex === dragState.tokenIndex) {
                        return {
                            ...token,
                            nodeId: targetNodeId
                        };
                    }
                    // Swap if we drop onto an occupied node
                    if (existingTokenOnTarget && token.sensorIndex === existingTokenOnTarget.sensorIndex) {
                        const sourceNodeId = prev.find((t)=>t.sensorIndex === dragState.tokenIndex)?.nodeId;
                        return {
                            ...token,
                            nodeId: sourceNodeId || token.nodeId
                        };
                    }
                    return token;
                });
            });
            setIsOptimized(false);
        }
        setDragState(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "relative w-full min-h-screen pb-[15vh] font-montserrat flex flex-col pt-[10vh] border-t border-[#1a1a1a]",
        style: {
            backgroundImage: "url('/images/stripes.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black/40 z-0 pointer-events-none"
            }, void 0, false, {
                fileName: "[project]/src/components/LiveDemo.tsx",
                lineNumber: 247,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 w-full min-h-[45vh] flex-1 flex flex-row",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-[50%] flex flex-col pl-16 lg:pl-25 pr-12 pt-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-white text-4xl lg:text-5xl font-[500] mb-12 tracking-wide",
                                children: "LeakSense In Action"
                            }, void 0, false, {
                                fileName: "[project]/src/components/LiveDemo.tsx",
                                lineNumber: 253,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-end gap-8 mb-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-gray-200 text-sm font-[400]",
                                                children: "Enter number of Sensors"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LiveDemo.tsx",
                                                lineNumber: 259,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: sensors,
                                                        onChange: (e)=>setSensors(e.target.value),
                                                        className: "appearance-none bg-[#111] border border-gray-600 text-white px-4 py-2 pr-12 rounded-sm focus:outline-none focus:border-[#F02B11] w-48 cursor-pointer transition-colors",
                                                        children: paretoData.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: d.sensors.toString(),
                                                                children: [
                                                                    d.sensors,
                                                                    " Sensor",
                                                                    d.sensors > 1 ? 's' : '',
                                                                    " ",
                                                                    d.sensors === 31 ? '(Full)' : ''
                                                                ]
                                                            }, d.sensors, true, {
                                                                fileName: "[project]/src/components/LiveDemo.tsx",
                                                                lineNumber: 269,
                                                                columnNumber: 21
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/LiveDemo.tsx",
                                                        lineNumber: 263,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            width: "14",
                                                            height: "14",
                                                            viewBox: "0 0 24 24",
                                                            fill: "none",
                                                            stroke: "#4A90E2",
                                                            strokeWidth: "2",
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                                                points: "6 9 12 15 18 9"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/LiveDemo.tsx",
                                                                lineNumber: 276,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/LiveDemo.tsx",
                                                            lineNumber: 275,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/LiveDemo.tsx",
                                                        lineNumber: 274,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/LiveDemo.tsx",
                                                lineNumber: 262,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/LiveDemo.tsx",
                                        lineNumber: 258,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-gray-200 text-sm font-[400]",
                                                children: "Upload your data"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LiveDemo.tsx",
                                                lineNumber: 283,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "h-[42px] w-[42px] border border-[#F02B11] bg-black/50 rounded-sm flex items-center justify-center hover:bg-[#F02B11]/10 transition-colors cursor-pointer group",
                                                title: "Upload CSV",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    width: "18",
                                                    height: "18",
                                                    viewBox: "0 0 24 24",
                                                    fill: "none",
                                                    stroke: "#F02B11",
                                                    strokeWidth: "2",
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    className: "group-hover:-translate-y-1 transition-transform",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                            x1: "12",
                                                            y1: "19",
                                                            x2: "12",
                                                            y2: "5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/LiveDemo.tsx",
                                                            lineNumber: 291,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                                            points: "5 12 12 5 19 12"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/LiveDemo.tsx",
                                                            lineNumber: 292,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/LiveDemo.tsx",
                                                    lineNumber: 290,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LiveDemo.tsx",
                                                lineNumber: 286,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/LiveDemo.tsx",
                                        lineNumber: 282,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LiveDemo.tsx",
                                lineNumber: 257,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleRunAnalysis,
                                className: "bg-[#F02B11] text-white px-6 py-[10px] rounded-sm w-max flex items-center gap-3 hover:bg-[#d0250f] transition-all font-[500] text-sm mt-2 shadow-lg cursor-pointer active:scale-95",
                                children: [
                                    "Run Analysis",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "16",
                                        height: "16",
                                        viewBox: "0 0 24 24",
                                        fill: "none",
                                        stroke: "currentColor",
                                        strokeWidth: "2",
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                x1: "5",
                                                y1: "12",
                                                x2: "19",
                                                y2: "12"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LiveDemo.tsx",
                                                lineNumber: 304,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                                points: "12 5 19 12 12 19"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LiveDemo.tsx",
                                                lineNumber: 305,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/LiveDemo.tsx",
                                        lineNumber: 303,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LiveDemo.tsx",
                                lineNumber: 298,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/LiveDemo.tsx",
                        lineNumber: 252,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-[50%] pr-16 lg:pr-25 flex items-center justify-center relative",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            viewBox: `${SVG_VIEWBOX.x} ${SVG_VIEWBOX.y} ${SVG_VIEWBOX.w} ${SVG_VIEWBOX.h}`,
                            className: "w-full h-full select-none",
                            style: {
                                touchAction: 'none'
                            },
                            onPointerMove: handlePointerMove,
                            onPointerUp: handlePointerUp,
                            onPointerLeave: handlePointerUp,
                            children: [
                                EDGES.map((edge)=>{
                                    const sourceNode = NODE_BY_ID[edge.source];
                                    const targetNode = NODE_BY_ID[edge.target];
                                    if (!sourceNode || !targetNode) return null;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                        x1: sourceNode.x,
                                        y1: sourceNode.y,
                                        x2: targetNode.x,
                                        y2: targetNode.y,
                                        stroke: "#444",
                                        strokeWidth: Math.max(1, edge.diameterMm / 250),
                                        strokeLinecap: "round"
                                    }, edge.id, false, {
                                        fileName: "[project]/src/components/LiveDemo.tsx",
                                        lineNumber: 327,
                                        columnNumber: 17
                                    }, this);
                                }),
                                NODES.map((node)=>{
                                    const isReservoir = node.kind === 'reservoir';
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                cx: node.x,
                                                cy: node.y,
                                                r: isReservoir ? 6 : 2.5,
                                                fill: isReservoir ? '#4A90E2' : '#777',
                                                className: "pointer-events-none"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LiveDemo.tsx",
                                                lineNumber: 346,
                                                columnNumber: 19
                                            }, this),
                                            isReservoir && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                                x: node.x,
                                                y: node.y - 12,
                                                fill: "#4A90E2",
                                                fontSize: "9",
                                                fontWeight: "bold",
                                                textAnchor: "middle",
                                                className: "pointer-events-none",
                                                children: node.label
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LiveDemo.tsx",
                                                lineNumber: 355,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, node.id, true, {
                                        fileName: "[project]/src/components/LiveDemo.tsx",
                                        lineNumber: 344,
                                        columnNumber: 17
                                    }, this);
                                }),
                                sensorTokens.map((token)=>{
                                    const node = NODE_BY_ID[token.nodeId];
                                    if (!node) return null;
                                    const isDragging = dragState?.tokenIndex === token.sensorIndex;
                                    // If dragging, follow mouse exactly. If not, map to node coordinates.
                                    const currentX = isDragging ? dragState.x : node.x;
                                    const currentY = isDragging ? dragState.y : node.y;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                        onPointerDown: (e)=>handlePointerDown(e, token.sensorIndex, currentX, currentY),
                                        className: `${isDragging ? 'cursor-grabbing' : 'cursor-grab'} z-50`,
                                        style: {
                                            // Transition is disabled while dragging for instant mouse follow!
                                            transition: isDragging ? 'none' : 'transform 800ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                                            transform: `translate(${currentX}px, ${currentY}px)`
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                cx: 0,
                                                cy: 0,
                                                r: 11,
                                                fill: "#F02B11",
                                                opacity: isDragging ? "0.6" : "0.3",
                                                className: `${isDragging ? '' : 'animate-pulse'} pointer-events-none transition-opacity`
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LiveDemo.tsx",
                                                lineNumber: 394,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                cx: 0,
                                                cy: 0,
                                                r: 15,
                                                fill: "transparent"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LiveDemo.tsx",
                                                lineNumber: 404,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                cx: 0,
                                                cy: 0,
                                                r: 4.5,
                                                fill: "#F02B11",
                                                stroke: "#FFF",
                                                strokeWidth: 1,
                                                className: "pointer-events-none shadow-md"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LiveDemo.tsx",
                                                lineNumber: 407,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, `sensor-token-${token.sensorIndex}`, true, {
                                        fileName: "[project]/src/components/LiveDemo.tsx",
                                        lineNumber: 383,
                                        columnNumber: 17
                                    }, this);
                                })
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/LiveDemo.tsx",
                            lineNumber: 312,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/LiveDemo.tsx",
                        lineNumber: 311,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/LiveDemo.tsx",
                lineNumber: 250,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-20 w-full h-[40vh] min-h-[300px] bg-[#1A1A1A] flex flex-row border-t border-white/5 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-[50%] pl-16 lg:pl-25 pr-12 py-10 border-r border-[#2a2a2a] flex flex-col",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-start w-full h-[30px] shrink-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-white text-lg font-[400]",
                                        children: "ROI Frontier"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LiveDemo.tsx",
                                        lineNumber: 428,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-gray-500 text-xs",
                                        children: "Accuracy vs. Cost"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LiveDemo.tsx",
                                        lineNumber: 429,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LiveDemo.tsx",
                                lineNumber: 427,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full flex-1 mt-6 relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "absolute inset-0 w-full h-full overflow-visible",
                                        preserveAspectRatio: "none",
                                        viewBox: "0 0 100 100",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M 0 0 L 0 100 L 100 100",
                                                fill: "none",
                                                stroke: "#666",
                                                strokeWidth: "2",
                                                vectorEffect: "non-scaling-stroke"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LiveDemo.tsx",
                                                lineNumber: 434,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                x1: "0",
                                                y1: "25",
                                                x2: "100",
                                                y2: "25",
                                                stroke: "#333",
                                                strokeWidth: "1",
                                                strokeDasharray: "2 2",
                                                vectorEffect: "non-scaling-stroke"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LiveDemo.tsx",
                                                lineNumber: 435,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                x1: "0",
                                                y1: "50",
                                                x2: "100",
                                                y2: "50",
                                                stroke: "#333",
                                                strokeWidth: "1",
                                                strokeDasharray: "2 2",
                                                vectorEffect: "non-scaling-stroke"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LiveDemo.tsx",
                                                lineNumber: 436,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                x1: "0",
                                                y1: "75",
                                                x2: "100",
                                                y2: "75",
                                                stroke: "#333",
                                                strokeWidth: "1",
                                                strokeDasharray: "2 2",
                                                vectorEffect: "non-scaling-stroke"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LiveDemo.tsx",
                                                lineNumber: 437,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: pathD,
                                                fill: "none",
                                                stroke: "#F02B11",
                                                strokeWidth: "2",
                                                vectorEffect: "non-scaling-stroke",
                                                className: "opacity-80"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LiveDemo.tsx",
                                                lineNumber: 439,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/LiveDemo.tsx",
                                        lineNumber: 433,
                                        columnNumber: 13
                                    }, this),
                                    paretoData.map((point)=>{
                                        const isActive = sensors === point.sensors.toString();
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute w-6 h-6 -ml-3 -mt-3 flex items-center justify-center cursor-pointer group z-10",
                                            style: {
                                                left: `${point.x}%`,
                                                top: `${point.y}%`
                                            },
                                            onClick: ()=>setSensors(point.sensors.toString()),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `rounded-full transition-all duration-300 ${isActive ? 'w-[8px] h-[8px] bg-[#F02B11] shadow-[0_0_12px_#F02B11]' : 'w-[4px] h-[4px] bg-[#555] group-hover:bg-gray-300'}`
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/LiveDemo.tsx",
                                                    lineNumber: 451,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `absolute top-full mt-2 text-[10px] font-montserrat transition-all duration-300 ${isActive ? 'text-[#F02B11] opacity-100' : 'text-[#555] opacity-0 group-hover:opacity-100'}`,
                                                    children: point.sensors
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/LiveDemo.tsx",
                                                    lineNumber: 456,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, point.sensors, true, {
                                            fileName: "[project]/src/components/LiveDemo.tsx",
                                            lineNumber: 445,
                                            columnNumber: 17
                                        }, this);
                                    })
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LiveDemo.tsx",
                                lineNumber: 432,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/LiveDemo.tsx",
                        lineNumber: 426,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-[50%] pl-16 pr-16 lg:pr-25 py-10 flex flex-col",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-start w-full h-[30px] shrink-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-gray-100 text-lg font-[400]",
                                    children: "Accuracy Score"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/LiveDemo.tsx",
                                    lineNumber: 472,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/LiveDemo.tsx",
                                lineNumber: 471,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full flex-1 mt-6 flex flex-col justify-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-white text-7xl lg:text-[6.5rem] font-[700] tracking-tight leading-none mb-2 transition-all",
                                        children: [
                                            currentData.accuracy,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/LiveDemo.tsx",
                                        lineNumber: 476,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-400 text-sm font-[400]",
                                        children: isOptimized ? 'Optimal sensor placement' : 'Custom sensor placement (Click "Run Analysis" to optimize)'
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LiveDemo.tsx",
                                        lineNumber: 479,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LiveDemo.tsx",
                                lineNumber: 475,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/LiveDemo.tsx",
                        lineNumber: 470,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/LiveDemo.tsx",
                lineNumber: 424,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/LiveDemo.tsx",
        lineNumber: 239,
        columnNumber: 5
    }, this);
}
_s(LiveDemo, "+iLuEF+rS0hYzPtxjaLHEnrvLH8=");
_c3 = LiveDemo;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "NODE_BY_ID$Object.fromEntries$NODES.map");
__turbopack_context__.k.register(_c1, "NODE_BY_ID$Object.fromEntries");
__turbopack_context__.k.register(_c2, "NODE_BY_ID");
__turbopack_context__.k.register(_c3, "LiveDemo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/PresentationScroller.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PresentationScroller
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
// src/components/PresentationScroller.tsx
'use client';
;
;
const slides = [
    {
        id: '01',
        title: 'Invisible By',
        cursiveWord: 'design',
        body: 'A leak inside a buried pipe gives no warning no puddle, no alarm. Most pipelines are watched at only a few fixed points, chosen by convention, not analysis. Between them, it\'s a black box. Problems go unnoticed until they\'re big enough to finally show up.',
        eg: 'A leak runs for weeks between two sensors before either one notices.',
        imageFirstHalf: '/images/Frame 1.webp',
        imageSecondHalf: '/images/Frame 1 (1).webp'
    },
    {
        id: '02',
        title: 'Coverage isn\'t',
        cursiveWord: "confidence",
        body: "Sensors at both ends only show that water was lost not where. Monitoring a pipeline isn't the same as being able to localize a problem inside it.",
        eg: 'An unexplained loss could be 200m in or 8km in every response starts by searching the whole length.',
        imageFirstHalf: '/images/Frame 1 (2).webp',
        imageSecondHalf: '/images/Frame 4 (1).webp'
    },
    {
        id: '03',
        title: 'Full Coverage Doesn\'t',
        cursiveWord: 'scale',
        body: 'Every added sensor needs power, installation, and upkeep often on buried, hard-to-reach pipe. Across kilometers, dense coverage becomes unaffordable for most operators.',
        eg: 'Instrumenting a 50km irrigation line could cost more than the water it protects',
        imageFirstHalf: '/images/Frame 5.webp',
        imageSecondHalf: '/images/Frame 7.webp'
    }
];
function CursiveWord({ word, capitalize = true }) {
    const displayWord = capitalize ? word.charAt(0).toUpperCase() + word.slice(1) : word;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "font-pixel font-normal tracking-normal text-white",
        children: displayWord
    }, void 0, false, {
        fileName: "[project]/src/components/PresentationScroller.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
_c = CursiveWord;
function renderTextWithCursive(text, cursiveWord) {
    if (!text) return null;
    const parts = text.split(new RegExp(`(${cursiveWord})`, 'gi'));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        children: parts.map((part, i)=>part.toLowerCase() === cursiveWord.toLowerCase() ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CursiveWord, {
                word: part,
                capitalize: false
            }, i, false, {
                fileName: "[project]/src/components/PresentationScroller.tsx",
                lineNumber: 53,
                columnNumber: 13
            }, this) : part)
    }, void 0, false, {
        fileName: "[project]/src/components/PresentationScroller.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
function PresentationScroller() {
    _s();
    const [currentImage, setCurrentImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(slides[0].imageFirstHalf);
    const [scrollDir, setScrollDir] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    // Track the direction of the scroll by comparing image array indices
    const handleImageChange = (newImage)=>{
        if (newImage === currentImage) return;
        const allImages = slides.flatMap((s)=>[
                s.imageFirstHalf,
                s.imageSecondHalf
            ]);
        const newIdx = allImages.indexOf(newImage);
        const currIdx = allImages.indexOf(currentImage);
        setScrollDir(newIdx > currIdx ? 1 : -1);
        setCurrentImage(newImage);
    };
    // Dynamic animation variants
    const imageVariants = {
        enter: {
            x: -60,
            opacity: 0
        },
        center: {
            x: 0,
            opacity: 1
        },
        exit: (dir)=>({
                // If scrolling up (dir === -1), snap towards left. If down, stay in place and fade.
                x: dir === -1 ? -60 : 0,
                opacity: 0,
                scale: 0.98,
                transition: {
                    duration: 0.4
                }
            })
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full bg-black font-montserrat flex flex-row",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-[35%] lg:w-[40%] relative z-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "sticky top-0 w-full h-screen overflow-hidden bg-black",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        mode: "popLayout",
                        custom: scrollDir,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].img, {
                            src: currentImage,
                            alt: "Presentation visual",
                            className: "w-full h-full object-cover",
                            custom: scrollDir,
                            variants: imageVariants,
                            initial: "enter",
                            animate: "center",
                            exit: "exit",
                            transition: {
                                duration: 0.7,
                                ease: "easeOut"
                            }
                        }, currentImage, false, {
                            fileName: "[project]/src/components/PresentationScroller.tsx",
                            lineNumber: 97,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/PresentationScroller.tsx",
                        lineNumber: 96,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/PresentationScroller.tsx",
                    lineNumber: 94,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/PresentationScroller.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-[65%] lg:w-[60%] flex flex-col",
                children: slides.map((slide)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "relative w-full min-h-screen flex flex-col justify-center px-16 lg:px-32 py-20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 w-full h-full flex flex-col pointer-events-none z-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        // Delay added here for the first slide (75% height pushes the trigger much further down)
                                        className: slide.id === '01' ? "w-full h-[75%]" : "w-full h-1/2",
                                        onViewportEnter: ()=>handleImageChange(slide.imageFirstHalf),
                                        viewport: {
                                            amount: 0.1
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PresentationScroller.tsx",
                                        lineNumber: 123,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        className: slide.id === '01' ? "w-full h-[25%]" : "w-full h-1/2",
                                        onViewportEnter: ()=>handleImageChange(slide.imageSecondHalf),
                                        viewport: {
                                            amount: 0.1
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PresentationScroller.tsx",
                                        lineNumber: 129,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/PresentationScroller.tsx",
                                lineNumber: 122,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative z-10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-white text-2xl lg:text-3xl font-[700] mb-12 tracking-wide",
                                        children: "Current Challenges"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PresentationScroller.tsx",
                                        lineNumber: 139,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-[65px] font-[700] text-[#F02B11] leading-none mb-0",
                                        children: slide.id
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PresentationScroller.tsx",
                                        lineNumber: 143,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-[65px] font-[700] text-white tracking-tight mb-8 leading-[1.1] flex flex-wrap items-baseline gap-x-4",
                                        children: [
                                            slide.title,
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CursiveWord, {
                                                word: slide.cursiveWord,
                                                capitalize: true
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/PresentationScroller.tsx",
                                                lineNumber: 148,
                                                columnNumber: 31
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/PresentationScroller.tsx",
                                        lineNumber: 147,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-base lg:text-lg font-[400] text-gray-200 leading-relaxed max-w-2xl mb-12",
                                        children: renderTextWithCursive(slide.body, slide.cursiveWord)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PresentationScroller.tsx",
                                        lineNumber: 151,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs font-[400] text-gray-400 uppercase tracking-widest max-w-xl leading-relaxed",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-[700] text-white",
                                                children: "EG :"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/PresentationScroller.tsx",
                                                lineNumber: 156,
                                                columnNumber: 17
                                            }, this),
                                            " ",
                                            renderTextWithCursive(slide.eg, slide.cursiveWord)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/PresentationScroller.tsx",
                                        lineNumber: 155,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/PresentationScroller.tsx",
                                lineNumber: 137,
                                columnNumber: 13
                            }, this)
                        ]
                    }, slide.id, true, {
                        fileName: "[project]/src/components/PresentationScroller.tsx",
                        lineNumber: 116,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/PresentationScroller.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/PresentationScroller.tsx",
        lineNumber: 90,
        columnNumber: 5
    }, this);
}
_s(PresentationScroller, "41zLbqXxd6Vqg7EU8zcdvWYZMw8=");
_c1 = PresentationScroller;
var _c, _c1;
__turbopack_context__.k.register(_c, "CursiveWord");
__turbopack_context__.k.register(_c1, "PresentationScroller");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_0_3npwk._.js.map