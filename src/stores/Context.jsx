import * as React from "react";
import { RootStore } from "./RootStore";

// 전역 데이터를 관리하기 위해서 React 패키지에서 제공하는 createContext라는 함수를 사용한다
// 개념적으로 React Context는 전역 데이터를 담고 있는 하나의 저장 공간이라고 생각할 수 있다.
// 다음과 같이 createContext 함수의 인자로 해당 컨텍스트에 디폴트로 저장할 값을 넘긴다.
export const StoreContext = React.createContext(new RootStore());

// 다음과 같이 어떤 컴포넌트에서 Provider로 감싸주면, 그 하위에 있는 모든 컴포넌트들은 이 React Context에 저장되어 있는 전역 데이터에 접근할 수 있다.
// value 속성값을 지정하지 않을 경우, Context를 생성할 때 넘겼던 디폴트값이 사용된다.
export const StoreProvider = StoreContext.Provider;

// useContext로 Context 접근하기 React Hooks에서 추가된 useContext 함수를 이용하면 좀 더 깔끔하게 Context에 저장되어 있는 전역 데이터에 접근할 수 있다.
// Button 컴포넌트는 useContext 함수에 LangContext를 넘김으로써 사용자 언어 설정값을 읽습니다. 단, 이 방법은 함수 컴포넌트에서만 사용 가능합니다.
export const useStores = () => React.useContext(StoreContext);
