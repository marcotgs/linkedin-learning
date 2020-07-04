package com.marcotgs.data.webservice;

import com.marcotgs.data.entity.Room;
import com.marcotgs.data.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class RoomController {
    @Autowired
    private RoomRepository repository;

    @RequestMapping(value = "/rooms", method = RequestMethod.GET)
    public List<Room> findAll(@RequestParam(required = false) final String roomNumber) {
        final List<Room> rooms = new ArrayList<>();
        if (null == roomNumber) {
            final Iterable<Room> results = this.repository.findAll();
            results.forEach(room -> {
                rooms.add(room);
            });
        } else {
            final Room room = this.repository.findByNumber(roomNumber);
            if (null != room) {
                rooms.add(room);
            }
        }
        return rooms;
    }
}
