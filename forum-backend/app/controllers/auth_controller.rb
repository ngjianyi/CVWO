class AuthController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :handle_record_not_found

    def login
        @user = User.find_by(username: params[:username])
        if @user && @user.authenticate(params[:password])
            token = encode_token({user_id: @user.id})
            cookies.signed[:jwt] = {value: token, httponly: true, expires: 1.hour.from_now, same_site: :none}
            render json: {user_id: @user.id, username: @user.username, token: token}
        else
            render json: @user.errors, status: :unauthorized
        end
    end

    def logout
        cookies.delete(:jwt)
        render json: { message: "Logout successful" }
    end

    private 

    def login_params 
        params.permit(:username, :password)
    end

    def handle_record_not_found(e)
        render json: { message: "User doesn't exist" }, status: :unauthorized
    end
end
