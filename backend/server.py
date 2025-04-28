from flask import Flask, request, jsonify
from flask_cors import CORS
from calculadora_backend import calcular_eficiencia_aislamiento

app = Flask(__name__)
print("Cargando server.py")
# Configure CORS to allow requests from http://localhost:3000
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, 
     supports_credentials=True, 
     allow_headers=["Content-Type", "Authorization"], 
     methods=["GET", "POST", "OPTIONS"])

@app.route('/calcular', methods=['POST'])
def procesar_calculo():
    try:
        data = request.get_json()
        if not data or 'cajas'   not in data:
            return jsonify({'error': 'Datos inválidos'}), 400
        resultado = calcular_eficiencia_aislamiento(data['cajas'])
        return jsonify(resultado)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
