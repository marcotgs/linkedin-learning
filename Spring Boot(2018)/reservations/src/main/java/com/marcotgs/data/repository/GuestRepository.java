package com.marcotgs.data.repository;

import org.springframework.data.repository.CrudRepository;

import com.marcotgs.data.entity.Guest;
import org.springframework.stereotype.Repository;

@Repository
public interface GuestRepository extends CrudRepository<Guest, Long> {

}