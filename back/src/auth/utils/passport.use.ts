import passport, { Strategy } from "passport";

/**
 * @param {T} T - Clase generica del controlador strategy 
 * @param {U} U - Parametros de la clase Strategy
 * @param {X} X - Callback de la clase Strategy
 */
type TypeStrategy<T, U, X> = { new (params: U, callback: X): T };

/**
 * @param {string} name - Nombre de la estrategia
 * @param {TypeStrategy} Strategy - Clase generica del controlador strategy
 * @param {U} params - Parametros de la clase Strategy
 * @param {X} callback - Funcion Callback de la clase Strategy donde se ejecuta la estrategia de autenticacion y redireccionamiento
 */
export function usePassport<T extends Strategy, U, X>(
  name: string,
  Strategy: TypeStrategy<T, U, X>,
  params: U,
  callback: X
) {
  
    passport.use(name, new Strategy(params, callback));
}
