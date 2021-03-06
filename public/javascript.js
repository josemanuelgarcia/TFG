var array_bloques = [11];

var array_codigo = ["void girar(String lado, int grados) {\n\tif(lado==\"horario\"){\n\t\tservoD.write(0);\n\t\tservoI.write(0);\n\t\tdelay(8.2*grados);\n\t} else{\n\t\tservoD.write(180);\n\t\tservoI.write(180);\n\t\tdelay(8.3*grados);\n\t}\n\tservoD.write(90);\n\tservoI.write(90);\n}\n\n",
    "void mover_hacia(String direccion) {\n\tif(direccion==\"delante\"){\n\t\tservoD.write(110);\n\t\tservoI.write(67);\n\t} else{\n\t\tservoD.write(70);\n\t\tservoI.write(113);\n\t}\n}\n\n",
    "void parar_todo() {\n  servoD.write(90);\n  servoI.write(90);\n}\n\n",
    "void actualizarTodosLosSensores() {\n  for(int i=0; i < 2; i++){\n   sensor[i] =  digitalRead(pinesSensores[i]);\n  }\n  for(int i=0; i < 4; i++){\n   delay(15);\n   for(int i=0; i < 2; i++){\n    if (digitalRead(pinesSensores[i]) == LINEA )\n      sensor[i] = LINEA;\n    }\n  }\n}\n\n",
    "bool hay_linea(int id_sensor) {\n  actualizarTodosLosSensores();\n  return sensor[id_sensor-1] == LINEA;\n}\n\n",
    "void cerrar_pinza() {\n  while ( gradosPinza < GMAX) {\n    gradosPinza = gradosPinza+1;\n    servoP.write(gradosPinza);\n  }\n}\n\n",
    "void abrir_pinza() {\n  while ( gradosPinza > GMIN) {\n    gradosPinza = gradosPinza-1;\n    servoP.write(gradosPinza);\n  }\n}\n\n",
    "void mover_pinza(int coordenada) {\n\tif ( coordenada < 0 || coordenada > 5 )\n\t\treturn;\n\t int movimiento = coordenada - posicionY;\n\tint tiempoY = tiempoPaso  * coordenada;\n\tif(coordenada==0) {\n\t\twhile(analogRead(A0)){\n\t\t\tservoPMove.write(0);\n\t\t}\n\t} else {\n\t\tif (movimiento < 0) {\n\t\t\tservoPMove.write(0);\n\t\t\tdelay(-tiempoY);\n\t\t} else {\n\t\t\tservoPMove.write(180);\n\t\t\tdelay(tiempoY);\n\t\t}\n\t}\n\tservoPMove.write(90);\n\tposicionY = coordenada;\n}\n\n",
    "bool hay_obstaculo(int distancia_param, int id_sensor) {\n\tdigitalWrite(pinesTrig[id_sensor-1], LOW);\n\tdelayMicroseconds(5);\n\tdigitalWrite(pinesTrig[id_sensor-1], HIGH);\n\tdelayMicroseconds(10);\n\tlong tiempoRespuesta = pulseIn(pinesEcho[id_sensor-1], HIGH);\n\tlong distancia = int(0.017 * tiempoRespuesta);\n\treturn distancia_param<distancia;\n}\n\n",
    "void mover_casilla(String direccion, int numCasillas) {\n\tif (direccion == \"ADELANTE\" && (posY + numCasillas < tableroY)) {\n\t\tfor (int i = 0; i < numCasillas; i++) {\n\t\t\tavanzar_casilla();\n\t\t\tposY++;\n\t\t\tparar_todo();\n\t\t}\n\t}\n\tif (direccion == \"ATRAS\" && (posY - numCasillas >=0)) {\n\tgirar(\"horario\", 90);\n\t\tfor (int i = 0; i < numCasillas; i++) {\n\t\t\tavanzar_casilla();\n\t\t\tposY--;\n\t\t\tparar_todo();\n\t\t}\n\tgirar(\"antihorario\", 90);\n\t}\n\tif (direccion == \"IZQUIERDA\" && (posX - numCasillas >=0)) {\n\tgirar(\"antihorario\", 90);\n\t\tfor (int i = 0; i < numCasillas; i++) {\n\t\t\tavanzar_casilla();\n\t\t\tposX--;\n\t\t\tparar_todo();\n\t\t}\n\tgirar(\"horario\", 90);\n\t}\n\tif (direccion == \"DERECHA\" && (posX + numCasillas < tableroX)) {\n\tgirar(\"horario\", 180);\n\t\tfor (int i = 0; i < numCasillas; i++) {\n\t\t\tavanzar_casilla();\n\t\t\tposX++;\n\t\t\tparar_todo();\n\t\t}\n\tgirar(\"antihorario\", 180);\n\t}\n}\n\n",
    "void avanzar_casilla() {\n\tint ruedas_delante = 0;\n\tint ruedas_detras = 0;\n\twhile (0 == ruedas_delante) {\n\t\tmover_hacia(\"delante\");\n\t\tif (hay_linea(1) && hay_linea(2)) {\n\t\t\truedas_delante = 1;\n\t\t\tdelay(2000);\n\t\t\tparar_todo();\n\t\t}\n\t}\n}\n"

];

var setup ="void setup() { \n\tSerial.begin(9600);\n\tservoI.attach(4);\n\tservoD.attach(5);\n\tservoP.attach(6);\n\tservoPMove.attach(7);\n\tpinMode(2 , INPUT);\n\tpinMode(3 , INPUT);\n\t\n\tfor(int i=0; i<3;i++){\n\t\tpinMode(pinesTrig[i] , OUTPUT);\n\t\tpinMode(pinesEcho[i], INPUT);\n\t}\n\tparar_todo();\n\tmover_pinza(0);\n\tmover_pinza(3);\n";

Blockly.JavaScript['bloque_principal'] = function (block) {
    array_bloques = [];
    array_bloques.push(8);
    array_bloques.push(3);
    var statements_variables = Blockly.JavaScript.statementToCode(block, 'variables');
    var statements_cuerpo = Blockly.JavaScript.statementToCode(block, 'cuerpo');
    var code = setup+statements_variables + '}\n\nvoid loop() {\n' + statements_cuerpo + '}\n\n';

    //Va hasta 11 porque son los metodos predeterminados que existen 
    for (i = 1; i < 12; i++) {
        if (array_bloques.indexOf(i) != -1) {
            code += array_codigo[i - 1];
        }
    }

    return code;
};

Blockly.JavaScript['parar'] = function (block) {
    var code = 'parar_todo();\n';
    array_bloques.push(3);
    return code;
};

Blockly.JavaScript['ir_a'] = function (block) {
    var text_coordenadax = block.getFieldValue('X');
    var text_coordenaday = block.getFieldValue('Y');
    var code = 'ir_a(' + text_coordenadax + ',' + text_coordenaday + ');\n';
    return code;
};

Blockly.JavaScript['girar_hacia'] = function (block) {
    var dropdown_direccion = block.getFieldValue('direccion');
    var angle_grados = block.getFieldValue('grados');
    var code = 'girar("' + dropdown_direccion + '",' + angle_grados + ');\n';
    array_bloques.push(1);
    return code;
};

Blockly.JavaScript['mover_hacia'] = function (block) {
    var dropdown_direccion = block.getFieldValue('direccion');
    var code = 'mover_hacia("' + dropdown_direccion + '");\n';
    array_bloques.push(2);
    return code;
};

Blockly.JavaScript['mover_pinza'] = function (block) {
    var distancia = block.getFieldValue('DIST');
    var code = 'mover_pinza(' + distancia + ');\n';
    array_bloques.push(8);
    return code;
};

Blockly.JavaScript['abrir_pinza'] = function (block) {
    var code = 'abrir_pinza();\n';
    array_bloques.push(7);
    return code;
};

Blockly.JavaScript['cerrar_pinza'] = function (block) {
    var code = 'cerrar_pinza();\n';
    array_bloques.push(6);
    return code;
};

Blockly.JavaScript['math_number'] = function (block) {
    var code = block.getFieldValue('NUM');
    return code;
};

Blockly.JavaScript['controls_if'] = function (block) {
    var code_if = Blockly.JavaScript.statementToCode(block, 'IF0');
    var code_do = Blockly.JavaScript.statementToCode(block, 'DO0');
    var elseIfCoun = block.elseifCount_;
    var code = "";

    if (block.elseifCount_ == 0) {
        code = 'if(' + code_if + ') {\n' + code_do + '}\n';
    }
    if (block.elseifCount_ > 0) {
        code = 'if(' + code_if + ') {\n' + code_do + '}\n'
        var contador = 1;
        while (contador < block.elseifCount_ + 1) {
            code_if = Blockly.JavaScript.statementToCode(block, 'IF' + contador);
            code_do = Blockly.JavaScript.statementToCode(block, 'DO' + contador);
            code += ' else if(' + code_if + ') {\n' + code_do + '}\n';
            contador++;
        }
    }
    if (block.elseCount_ == 1) {
        var code_else = Blockly.JavaScript.statementToCode(block, 'ELSE');
        code += 'else {\n' + code_else + '}\n';
    }
    return code;
};

Blockly.JavaScript['controls_whileUntil'] = function (block) {
    var code_if = Blockly.JavaScript.statementToCode(block, 'BOOL');
    var mode = block.getFieldValue('MODE');
    var code_do = Blockly.JavaScript.statementToCode(block, 'DO');
    if (mode == 'WHILE')
        return 'while(' + code_if + ') {\n' + code_do + '}\n';
    else
        return 'do {\n' + code_do + '} while(' + code_if + ')\n';

};

Blockly.JavaScript['logic_compare'] = function (block) {
    var code1 = Blockly.JavaScript.statementToCode(block, 'A');
    var operador = block.getFieldValue('OP');
    var code2 = Blockly.JavaScript.statementToCode(block, 'B');

    if (code1 == '') {
        code1 = block.getInputTargetBlock('A');
    }
    if (code2 == '') {
        code2 = block.getInputTargetBlock('B');
    }

    if (operador == 'EQ') {
        operador = '==';
    } else if (operador == 'NEQ') {
        operador = '!='
    } else if (operador == 'LT') {
        operador = '<';
    } else if (operador == 'LTE') {
        operador = '<=';
    } else if (operador == 'GT') {
        operador = '>';
    } else if (operador == 'GTE') {
        operador = '>=';
    }
    var code = code1 + ' ' + operador + ' ' + code2;
    return code;
};

Blockly.JavaScript['controls_repeat'] = function (block) {
    var code_for = block.getFieldValue('TIMES');
    var code_do = Blockly.JavaScript.statementToCode(block, 'DO');
    return 'for(int i=0; i<' + code_for + ';i++) {\n' + code_do + '}\n';
};

Blockly.JavaScript['variables_set'] = function (block) {
    var nombre = block.getFieldValue('VAR');
    var value = Blockly.JavaScript.statementToCode(block, 'VALUE');
    return nombre + '=' + value + ';\n';
};

Blockly.JavaScript['variables_get'] = function (block) {
    var nombre = block.getFieldValue('VAR');
    return nombre;
};

Blockly.JavaScript['detectar_linea'] = function (block) {
    var dropdown_id_sensor = block.getFieldValue('id_sensor');
    var code = 'hay_linea(' + dropdown_id_sensor + ')';
    array_bloques.push(4);
    array_bloques.push(5);
    return code;
};

Blockly.JavaScript['distancia_obstaculo'] = function (block) {
    var text_centimetros = block.getFieldValue('centimetros');
    var dropdown_id_sensor = block.getFieldValue('id_sensor');
    var code = 'hay_obstaculo(' + text_centimetros + ',' + dropdown_id_sensor + ')';
    array_bloques.push(9);
    return code;
};

Blockly.JavaScript['establecer_posicion_inicial'] = function (block) {
    var text_coordenadax = block.getFieldValue('coordenadaX');
    var text_coordenaday = block.getFieldValue('coordenadaY');
    var code = 'int posX =' + text_coordenadax + ';\nint posY= ' + text_coordenaday + ';\n';
    return code;
};

Blockly.JavaScript['establecer_tamanio_tablero'] = function (block) {
    var text_tamx = block.getFieldValue('tamX');
    var text_tamy = block.getFieldValue('tamY');
    var code = 'int tableroX =' + text_tamx + ';\nint tableroY=' + text_tamy + ';\n';
    return code;
};

Blockly.JavaScript['mover_casilla'] = function (block) {
    var dropdown_direccion = block.getFieldValue('direccion');
    var text_casillas = block.getFieldValue('casillas');
    var code = 'mover_casilla("' + dropdown_direccion + '",' + text_casillas + ');\n';
    array_bloques.push(1);
    array_bloques.push(2);
    array_bloques.push(3);
    array_bloques.push(4);
    array_bloques.push(5);
    array_bloques.push(10);
    array_bloques.push(11);
    return code;
};

Blockly.JavaScript['esperar'] = function (block) {
    var text_tiempo = block.getFieldValue('tiempo');
    var code = 'delay(' + text_tiempo + ');\n';
    return code;
};

