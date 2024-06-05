import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import pessoaStore from "./pessoa.store";
import gatewayStore from "./gateway.store";
import dispositivoStore from "./dispositivo.store";
import sensorStore from "./sensor.store";
import medicaoStore from "./medicao.store";
import fakeAuthenticationStore from "./alt.authentication.store";
// ...

const store = configureStore({
  reducer: {
    pessoa: pessoaStore,
    gateway: gatewayStore,
    dispositivo: dispositivoStore,
    sensor: sensorStore,
    medicao: medicaoStore,
    auth: fakeAuthenticationStore,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
