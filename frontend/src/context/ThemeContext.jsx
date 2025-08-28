import React,{createContext,useCallback,useContext,useEffect,useMemo,useState} from 'react'

const ThemeContext = createContext(null)

const STOREAGE_KEY='theme'

function getInitialTheme(){

    const saved =localStorage.getItem(STOREAGE_KEY)     //theme라는 키 값이 있으면 가져옴

    if(saved==='light' || saved==='dark') return saved

    return window.matchMedia("(prefer-color-scheme:dark)").matches? 'dark':'light'  
}

export function ThemeProvider({children}){

    const [theme,setTheme]=useState(getInitialTheme)

    useEffect(()=>{
        const root = document.documentElement

        if(theme==='dark') root.setAttribute('data-theme','dark')
        else root.removeAttribute('data-theme') //기존 데이터 삭제
        localStorage.setItem(STOREAGE_KEY,theme) //변경된 테마 저장

    },[theme])//,[] 업데이트 된 요소가 들어가는 곳

    const toggleTheme=useCallback(()=>setTheme(t=>t==='dark'?'light':'dark')) //다크일때 클릭하면 라이트, 라이트일때 클릭하면 다크 (토글버튼)
    
    const setDark=useCallback(()=>setTheme('dark'))
    const setLight=useCallback(()=>setTheme('light'))

    const value=useMemo(
        /*  useMemo 기본형태
            ()=>({

            }),
            []
        */
        ()=>({
            theme,
            isDark:theme==='dark',
            toggleTheme,
            setDark,
            setLight
        }),
        [theme,toggleTheme,setDark,setLight]
    )

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(){
    const ctx = useContext(ThemeContext)

    if(!ctx) throw new Error("테마를 사용할 수 없습니다.")

    return ctx
}