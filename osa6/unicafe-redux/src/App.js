import { createStore } from "redux"
import counterReducer from "./reducer"

const store = createStore(counterReducer)

const App = () => {
  const doAction = action => {
    console.log(store.dispatch({type: action}))
  }

  return (
    <div>
      <button onClick={() => doAction("GOOD")} id={'good-button'}>good</button>
      <button onClick={() => doAction("OK")} id={'ok-button'}>ok</button>
      <button onClick={() => doAction("BAD")} id={'bad-button'}>bad</button>
      <button onClick={() => doAction("ZERO")} id={'reset-button'}>reset stats</button>
      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>{store.getState().good}</td>
          </tr>
          <tr>
            <td>ok</td>
            <td>{store.getState().ok}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{store.getState().bad}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const appExports = {
  App,
  store
}

export default appExports
