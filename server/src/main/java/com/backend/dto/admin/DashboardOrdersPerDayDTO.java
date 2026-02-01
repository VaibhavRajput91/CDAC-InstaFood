package com.backend.dto.admin;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DashboardOrdersPerDayDTO {
	 private LocalDate date;
	    private Long count;
}
