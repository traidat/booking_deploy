package com.booking;

import com.booking.model.account.Account;
import com.booking.model.account.AccountType;
import com.booking.service.AccountService;
import com.booking.service.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;

@Component
public class Interceptor implements HandlerInterceptor {
    @Autowired
    private JWTService jwtService;
    @Autowired
    private AccountService accountService;
    public static final List<String> PATH = new ArrayList<String>() {{
        add("/api/signup/**");
        add("/api/login");
        add("/api/account/**");
        add("/api/agent/signup/**");
        add("/api/agent/**");
        add("/api/hotel/**");
        add("/api/hotel/room/**");
        add("/api/hotel");
        add("/api/hotel/rating/**");
        add("/api/hotel/personal");
        add("/api/agent/hotel/room");
        add("/api/agent/hotel**");
        add("/api/hotel/order");
        add("/api/hotel/cancel**");
        add("/api/agent/flight");
        add("/api/flight/airport");
        add("/api/flight/order/**");
        add("/api/flight/cancel/**");
        add("/api/flight/personal");
        add("/api/country**");
        add("/api/city**");
        add("/api/personal/**");
        add("/api/personal**");
        add("/api/personal");
        add("/api/personal_agent");
        add("/api/rating**");
        add("/api/agent/finish");
        add("/api/rating/**");
        add("/api/hotel/all_rate**");
        add("/api/account");
        add("/api/hotel_agent/room/**");
        add("/api/agent/room/**");
        add("/api/agent/hotel/room/modify/**");
        add("/api/agent/hotel/modify/**");
        add("/api/fb");
        add("/api/reply/**");
        add("/api/reply/rating/**");
        add("/api/agent/reply");
        add("/api/admin/tourist**");
        add("/api/admin/tourist/order**");
        add("/api/admin/personal_agent/**");
        add("/api/admin/banned/**");
        add("/api/admin/all/order");
        add("/api/agent/paid/**");

    }};

    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {

        AntPathMatcher antPathMatcher = new AntPathMatcher();
        String url = request.getRequestURI();
        Predicate<String> predicate = s -> antPathMatcher.match(s, url);
        if (request.getMethod().equals("OPTIONS")) {
            return true;
        } else {
            if (PATH.stream().anyMatch(predicate)) {
                if (url.contains("/api/signup") || url.contains("/api/login") || url.contains("/api/agent/signup") ||
                        url.contains("api/hotel") || url.contains("/api/city") || url.contains("/api/country") ||
                        url.contains("/api/agent/country") || url.contains("/api/agent/city") || url.contains("/api/agent/service") ||
                        url.contains("/api/account") || url.contains("api/hotel/rating") || url.contains("api/hotel_agent/room") ||
                        url.contains("/api/rating") ||  url.contains("api/account") || url.contains("api/fb") ||
                        url.contains("/api/reply") || url.contains("api/reply/rating") || url.contains("api/agent/hotel") ||
                        url.contains("/api/agent/paid")){
                    return true;
                } else {
                    String token = jwtService.getJwtFromRequest(request);
                    if (token != null && jwtService.validateJwtToken(token)) {
                        String username = jwtService.getUserNameFromJwtToken(token);
                        Optional<Account> account = accountService.getAccount(username);
                        if (account.isPresent()) {
                            Account acc = account.get();
                            if (acc.getAccountType() == AccountType.TOURIST_BANNED || acc.getAccountType() == AccountType.AGENT_BANNED) {
                                String message = "[{\"message\": \"User forbidden\"}]";
                                response.getWriter().write(message);
                                response.setContentType("application/json");
                                response.setStatus(403);
                                return false;
                            } else if ((request.getRequestURI().contains("agent") && acc.getAccountType() == AccountType.AGENT) ||
                                        request.getRequestURI().contains("admin") && acc.getAccountType() == AccountType.ADMIN) {
                                return true;
                            } else if (acc.getAccountType() == AccountType.TOURIST) {
                                return true;
                            } else {
                                String message = "[{\"message\": \"User forbidden\"}]";
                                response.getWriter().write(message);
                                response.setContentType("application/json");
                                response.setStatus(403);
                                return false;
                            }
                        } else {
                            String message = "[{\"message\": \"Account not found\"}]";
                            response.getWriter().write(message);
                            response.setContentType("application/json");
                            response.setStatus(404);
                            return false;
                        }
                    } else {
                        String message = "[{\"message\": \"User unauthorized\"}]";
                        response.getWriter().write(message);
                        response.setContentType("application/json");
                        response.setStatus(401);
                        return false;
                    }
                }
            } else {
                String message = "[{\"message\": \"Not found\"}]";
                response.getWriter().write(message);
                response.setContentType("application/json");
                response.setStatus(404);
                return false;
            }
        }
    }

    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
                           ModelAndView modelAndView) throws Exception {

    }
}
