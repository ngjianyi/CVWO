class ApplicationController < ActionController::API
    include ::ActionController::Cookies

    SECRET_KEY = Rails.application.secret_key_base

    def encode_token(payload)
        JWT.encode(payload, SECRET_KEY)
    end

    def decoded_token
        jwt_token = cookies.signed[:jwt]
        if jwt_token
            begin
                JWT.decode(jwt_token, SECRET_KEY, true, algorithm: 'HS256')
            rescue JWT::DecodeError
                nil
            end
        end
    end

    def current_user
        if decoded_token
            user_id = decoded_token[0]['user_id']
            @user = User.find_by(id: user_id)
        end
    end
    
    def authorized
        unless !!current_user
            render json: { message: 'Please log in' }, status: :unauthorized
        end
    end
end
