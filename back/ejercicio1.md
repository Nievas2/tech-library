### Ejercicio 1: Intercambiar Valores

#### Ejemplo Resuelto

```java
public class IntercambioValores {
    public static void main(String[] args) {
        int x = 5;
        int y = 10;

        System.out.println("Antes del intercambio: x = " + x + ", y = " + y);

        // Intercambiar los valores
        int temp = x;
        x = y;
        y = temp;

        System.out.println("Después del intercambio: x = " + x + ", y = " + y);
    }
}
```

#### Explicación Paso a Paso

1. **Declarar las Variables**:

   - Primero, declaramos dos variables `x` y `y` y les asignamos los valores `5` y `10` respectivamente.

   ```java
   int x = 5;
   int y = 10;
   ```
2. **Imprimir los Valores Iniciales**:

   - Imprimimos los valores de `x` y `y` antes del intercambio.

   ```java
   System.out.println("Antes del intercambio: x = " + x + ", y = " + y);
   ```
3. **Intercambiar los Valores**:

   - Para intercambiar los valores, utilizamos una variable temporal `temp`. Asignamos el valor de `x` a `temp`.

   ```java
   int temp = x;
   ```

   - Luego, asignamos el valor de `y` a `x`.

   ```java
   x = y;
   ```

   - Finalmente, asignamos el valor de `temp` (que contiene el valor original de `x`) a `y`.

   ```java
   y = temp;
   ```
4. **Imprimir los Valores Intercambiados**:

   - Imprimimos los valores de `x` y `y` después del intercambio.

   ```java
   System.out.println("Después del intercambio: x = " + x + ", y = " + y);
   ```

#### Código Completo con Explicaciones en Comentarios

```java
public class IntercambioValores {
    public static void main(String[] args) {
        // Paso 1: Declarar las variables y asignar valores iniciales
        int x = 5;
        int y = 10;

        // Paso 2: Imprimir los valores iniciales de x y y
        System.out.println("Antes del intercambio: x = " + x + ", y = " + y);

        // Paso 3: Intercambiar los valores
        // Usar una variable temporal para almacenar el valor de x
        int temp = x;
        // Asignar el valor de y a x
        x = y;
        // Asignar el valor de temp (originalmente el valor de x) a y
        y = temp;

        // Paso 4: Imprimir los valores intercambiados de x y y
        System.out.println("Después del intercambio: x = " + x + ", y = " + y);
    }
}
```

### Ejercicios para Resolver

#### Ejercicio 2: Suma e Intercambio

1. Declara dos variables enteras `m` y `n` y asígnales valores iniciales.
2. Imprime los valores iniciales de `m` y `n`.
3. Intercambia los valores de `m` y `n` utilizando una tercera variable `temp`.
4. Suma los valores de `m` y `n` después del intercambio y almacena el resultado en una nueva variable `suma`.
5. Imprime el resultado de la suma.

#### Ejercicio 3: Operaciones con Variables

1. Declara tres variables `x`, `y`, y `z` con valores iniciales.
2. Imprime los valores iniciales de `x`, `y`, y `z`.
3. Realiza las siguientes operaciones:
   - Asigna a `x` el valor de `y` más `z`.
   - Asigna a `y` el valor de `x` menos `z`.
   - Asigna a `z` el valor de `x` multiplicado por `y`.
4. Imprime los valores finales de `x`, `y`, y `z`.

### Conclusión

Estos ejercicios están diseñados para ayudar a tu estudiante a comprender mejor el manejo de variables y cómo intercambiar y modificar sus valores para resolver problemas lógicos. Anima a tu estudiante a seguir los pasos cuidadosamente y a experimentar con diferentes valores. ¡Buena suerte!
