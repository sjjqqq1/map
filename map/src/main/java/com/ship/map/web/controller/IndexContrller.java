package com.ship.map.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexContrller {
	@RequestMapping("/")
	public String index() {
		return "home";
	}
}
